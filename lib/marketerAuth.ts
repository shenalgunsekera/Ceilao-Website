// Marketer auth + affiliate attribution helpers.
//
// Marketers are field agents whose accounts are created by staff in the Admin
// Panel. They log in with their MARKETER ID (e.g. MKT001) + password — the ID
// maps to a synthetic email (mkt001@marketers.ceilaoib.lk) behind the scenes,
// exactly like customer phone logins. Each marketer has an affiliate link
// (/get-quote?ref=MKT001); quotes arriving through it are attributed to them.

import { signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const MARKETER_DOMAIN =
  process.env.NEXT_PUBLIC_MARKETER_EMAIL_DOMAIN || 'marketers.ceilaoib.lk';

const REF_KEY = 'ceilao_ref';
const REF_TTL_MS = 60 * 24 * 60 * 60 * 1000; // 60-day attribution window

export type MarketerProfile = {
  marketer_id: string;
  full_name?: string;
  phone?: string;
  active?: boolean;
};

/** Normalise a typed marketer ID: trim, uppercase, alphanumeric only. */
export function normaliseMarketerId(raw: string): string | null {
  const id = (raw || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  return id.length >= 3 && id.length <= 20 ? id : null;
}

export function marketerIdToEmail(id: string): string {
  return id.toLowerCase() + '@' + MARKETER_DOMAIN;
}

export async function loginMarketer(rawId: string, password: string): Promise<User> {
  const id = normaliseMarketerId(rawId);
  if (!id) throw new Error('Enter your marketer ID (e.g. MKT001).');
  const cred = await signInWithEmailAndPassword(auth, marketerIdToEmail(id), password);
  return cred.user;
}

export async function logoutMarketer(): Promise<void> {
  await signOut(auth);
}

/** Marketer profile for the signed-in uid — null if this user isn't a marketer. */
export async function getMarketerProfile(uid: string): Promise<MarketerProfile | null> {
  try {
    const snap = await getDoc(doc(db, 'marketers', uid));
    return snap.exists() ? (snap.data() as MarketerProfile) : null;
  } catch {
    return null;
  }
}

/** Public lookup used for ?ref= attribution: id → { name, active }. */
export async function lookupMarketerLink(id: string): Promise<{ marketer_id: string; name: string } | null> {
  try {
    const snap = await getDoc(doc(db, 'marketer_links', id.toLowerCase()));
    if (!snap.exists()) return null;
    const d = snap.data();
    if (d.active === false) return null;
    return { marketer_id: d.marketer_id || id.toUpperCase(), name: d.name || '' };
  } catch {
    return null;
  }
}

// ── Affiliate ref storage (?ref=MKT001 → localStorage, 60-day window) ────────

export function saveAffiliateRef(rawId: string): void {
  const id = normaliseMarketerId(rawId);
  if (!id) return;
  try {
    localStorage.setItem(REF_KEY, JSON.stringify({ id, ts: Date.now() }));
  } catch { /* ignore */ }
}

export function getAffiliateRef(): string | null {
  try {
    const raw = localStorage.getItem(REF_KEY);
    if (!raw) return null;
    const { id, ts } = JSON.parse(raw);
    if (!id || !ts || Date.now() - ts > REF_TTL_MS) return null;
    return id as string;
  } catch {
    return null;
  }
}

export function clearAffiliateRef(): void {
  try { localStorage.removeItem(REF_KEY); } catch { /* ignore */ }
}
