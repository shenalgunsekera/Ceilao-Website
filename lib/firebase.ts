// Firebase client — connects to the SAME project as the Ceilao staff app,
// so customer accounts and submitted quotes live in one Firestore.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  type Auth,
} from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// The Firebase WEB config is not a secret (it ships in the client bundle and is
// safe to expose — access is controlled by the Firestore/Storage security
// rules). Env vars override these defaults so the build works even before they
// are configured in the host (e.g. Vercel). Project: insureme-db (shared with
// the staff app).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAa2MA8GGlGgr1H7bVM0LqfgNeUCWNe81c',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'insureme-db.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'insureme-db',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'insureme-db.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '356062305753',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:356062305753:web:93649783188b5a78358dc8',
};

// Reuse the app across hot-reloads / route changes (Next.js can re-import).
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage: FirebaseStorage = getStorage(app);

// Customers stay logged in across visits (better UX than the staff app's
// session-only persistence). Guarded for SSR.
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch(() => {});
}

export default app;
