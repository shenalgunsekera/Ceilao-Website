// Customer auth helpers.
//
// Design (see CUSTOMER_WEBSITE_SPEC §5): the customer signs up with
// name + phone + password. Phone ownership is proven once via Firebase
// Phone Auth (SMS OTP). We then LINK an email/password credential — using a
// synthetic email derived from the phone — to that same user, so every later
// login is just phone + password (no OTP), and Firebase guarantees one
// account per phone number.

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  EmailAuthProvider,
  linkWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type ConfirmationResult,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { getOrCreateDeviceId } from './deviceId';

const EMAIL_DOMAIN =
  process.env.NEXT_PUBLIC_CUSTOMER_EMAIL_DOMAIN || 'customers.ceilaoib.lk';

/**
 * Normalise a Sri Lankan mobile number to E.164 (+94XXXXXXXXX).
 * Accepts every common way of typing it, e.g. all of these → +94743364614:
 *   +94743364614 · 0094743364614 · 94743364614 · 0743364614 · 074 336 4614 · 743364614
 */
export function normalisePhone(raw: string): string | null {
  let d = (raw || '').replace(/\D/g, ''); // keep digits only
  // Strip any international / trunk prefix down to the 9-digit subscriber number.
  if (d.startsWith('0094')) d = d.slice(4);
  else if (d.startsWith('94')) d = d.slice(2);
  else if (d.startsWith('0')) d = d.slice(1);
  // SL mobiles are 9 digits starting with 7 (70/71/72/74/75/76/77/78).
  if (d.length === 9 && d.startsWith('7')) return '+94' + d;
  return null;
}

/** Synthetic email used as the email/password identifier for a phone. */
export function phoneToEmail(e164: string): string {
  return e164.replace('+', '') + '@' + EMAIL_DOMAIN;
}

/**
 * Create a FRESH invisible reCAPTCHA verifier each time. A reCAPTCHA token is
 * single-use, so reusing a verifier across attempts triggers obscure errors
 * (e.g. auth/error-code:-39). We clear any previous verifier and empty its
 * container before creating a new one.
 */
export function makeRecaptcha(containerId: string): RecaptchaVerifier {
  const w = window as unknown as { _ceilaoRecaptcha?: RecaptchaVerifier | null };
  if (w._ceilaoRecaptcha) {
    try { w._ceilaoRecaptcha.clear(); } catch { /* ignore */ }
    w._ceilaoRecaptcha = null;
  }
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '';
  const verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
  w._ceilaoRecaptcha = verifier;
  return verifier;
}

/** Step 1 of signup: send the SMS OTP to the phone. */
export async function sendSignupOtp(
  e164: string,
  recaptcha: RecaptchaVerifier
): Promise<ConfirmationResult> {
  return signInWithPhoneNumber(auth, e164, recaptcha);
}

/**
 * Step 2 of signup: confirm OTP, then link an email/password credential so
 * future logins are phone + password. Writes the customers/{uid} profile.
 */
export async function confirmSignup(
  confirmation: ConfirmationResult,
  code: string,
  opts: { fullName: string; e164: string; password: string }
): Promise<User> {
  const cred = await confirmation.confirm(code); // signs in via phone
  const user = cred.user;

  // Link email/password (synthetic email from phone) for password logins.
  const email = phoneToEmail(opts.e164);
  try {
    await linkWithCredential(user, EmailAuthProvider.credential(email, opts.password));
  } catch (err: unknown) {
    // If already linked (e.g. retried), ignore "provider-already-linked".
    const code = (err as { code?: string })?.code || '';
    if (code !== 'auth/provider-already-linked' && code !== 'auth/email-already-in-use') {
      throw err;
    }
  }

  await updateProfile(user, { displayName: opts.fullName });

  await setDoc(
    doc(db, 'customers', user.uid),
    {
      full_name: opts.fullName,
      phone: opts.e164,
      phone_verified: true,
      role: 'customer',
      created_at: serverTimestamp(),
    },
    { merge: true }
  );

  return user;
}

/**
 * FREE signup — no SMS OTP.
 * One account per phone number is enforced by Firebase itself: each phone maps
 * to exactly one synthetic email, and a second create attempt throws
 * auth/email-already-in-use. Accounts start with phone_verified:false; staff
 * confirm phone ownership on the first call (Admin Panel → Customers) — the
 * broker calls every customer before processing a quote anyway.
 * The signup device ID is a soft signal so staff can spot one browser creating
 * many accounts.
 */
export async function signupWithPhonePassword(opts: {
  fullName: string;
  rawPhone: string;
  password: string;
}): Promise<User> {
  const e164 = normalisePhone(opts.rawPhone);
  if (!e164) throw new Error('Enter a valid Sri Lankan mobile number.');

  const email = phoneToEmail(e164);
  const cred = await createUserWithEmailAndPassword(auth, email, opts.password);
  const user = cred.user;

  await updateProfile(user, { displayName: opts.fullName });

  let deviceId = '';
  try { deviceId = await getOrCreateDeviceId(); } catch { /* best-effort */ }

  await setDoc(
    doc(db, 'customers', user.uid),
    {
      full_name: opts.fullName,
      phone: e164,
      phone_verified: false,
      role: 'customer',
      signup_device_id: deviceId,
      created_at: serverTimestamp(),
    },
    { merge: true }
  );

  return user;
}

/** Login with phone + password (maps phone -> synthetic email). */
export async function loginWithPhonePassword(
  rawPhone: string,
  password: string
): Promise<User> {
  const e164 = normalisePhone(rawPhone);
  if (!e164) throw new Error('Enter a valid Sri Lankan mobile number.');
  const email = phoneToEmail(e164);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

/** Fetch the customers/{uid} profile doc. */
export async function getCustomerProfile(uid: string) {
  const snap = await getDoc(doc(db, 'customers', uid));
  return snap.exists() ? snap.data() : null;
}
