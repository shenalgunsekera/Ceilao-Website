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
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type ConfirmationResult,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

const EMAIL_DOMAIN =
  process.env.NEXT_PUBLIC_CUSTOMER_EMAIL_DOMAIN || 'customers.ceilaoib.lk';

/** Normalise a Sri Lankan phone number to E.164 (+94XXXXXXXXX). */
export function normalisePhone(raw: string): string | null {
  const digits = (raw || '').replace(/[^\d+]/g, '');
  let d = digits.replace(/^\+/, '');
  if (d.startsWith('0')) d = '94' + d.slice(1); // 07X… -> 947X…
  if (d.length === 9 && d.startsWith('7')) d = '94' + d; // 7XXXXXXXX
  if (!d.startsWith('94') || d.length !== 11) return null;
  return '+' + d;
}

/** Synthetic email used as the email/password identifier for a phone. */
export function phoneToEmail(e164: string): string {
  return e164.replace('+', '') + '@' + EMAIL_DOMAIN;
}

/** Create (once) an invisible reCAPTCHA verifier bound to a container id. */
export function makeRecaptcha(containerId: string): RecaptchaVerifier {
  // Reuse if already created on the window to avoid duplicates on re-render.
  const w = window as unknown as { _ceilaoRecaptcha?: RecaptchaVerifier };
  if (w._ceilaoRecaptcha) return w._ceilaoRecaptcha;
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
