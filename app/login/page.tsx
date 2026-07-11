'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { loginWithPhonePassword, loginWithGoogle } from '@/lib/customerAuth';
import EyeToggle from '@/components/ui/EyeToggle';

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-ink" />}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard';

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const googleLogin = async () => {
    setError('');
    setBusy(true);
    try {
      const { needsProfile } = await loginWithGoogle();
      router.push(needsProfile ? `/complete-profile?next=${encodeURIComponent(next)}` : next);
    } catch (err: unknown) {
      const c = (err as { code?: string })?.code || '';
      if (c !== 'auth/popup-closed-by-user' && c !== 'auth/cancelled-popup-request')
        setError((err as Error)?.message || 'Google sign-in failed. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const submit = async () => {
    setError('');
    setBusy(true);
    try {
      await loginWithPhonePassword(phone, password);
      router.push(next);
    } catch (err: unknown) {
      const c = (err as { code?: string })?.code || '';
      if (c === 'auth/invalid-credential' || c === 'auth/wrong-password' || c === 'auth/user-not-found')
        setError('Incorrect mobile number or password.');
      else setError((err as Error)?.message || 'Could not log in. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-ink bg-brand-radial flex items-center justify-center px-6 pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-3">Welcome back</p>
          <h1 className="font-display text-chalk text-4xl tracking-wide">
            LOG IN TO <span className="bg-brand-gradient bg-clip-text text-transparent">CEILAO</span>
          </h1>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-7 backdrop-blur flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[11px] tracking-widest uppercase text-gray-500">Mobile number</span>
            <input
              type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="077 123 4567"
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="bg-ink border border-gray-700 rounded-lg px-4 py-3 text-chalk font-body text-sm outline-none focus:border-brand transition-colors"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[11px] tracking-widest uppercase text-gray-500">Password</span>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="bg-ink border border-gray-700 rounded-lg px-4 py-3 pr-11 text-chalk font-body text-sm outline-none focus:border-brand transition-colors w-full"
              />
              <EyeToggle show={showPw} onToggle={() => setShowPw((s) => !s)} />
            </div>
          </label>
          {error && (
            <div className="rounded-lg bg-brand-600/15 border border-brand-600/30 px-3 py-2">
              <p className="font-body text-xs text-brand-300">{error}</p>
            </div>
          )}
          <button onClick={submit} disabled={busy} className="btn-brand mt-1">
            {busy ? 'Logging in…' : 'Log in'}
          </button>

          <div className="flex items-center gap-3 my-1">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="font-body text-[11px] tracking-widest uppercase text-gray-600">or</span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>
          <button onClick={googleLogin} disabled={busy}
            className="flex items-center justify-center gap-3 border border-gray-700 rounded-lg px-4 py-3 font-body text-sm text-chalk hover:border-brand transition-colors">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center font-body text-xs text-gray-500 mt-1">
            New to Ceilao?{' '}
            <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-brand-light hover:underline">
              Create an account
            </Link>
          </p>
          <p className="text-center font-body text-[11px] text-gray-600">
            Company marketer?{' '}
            <Link href="/marketer" className="text-brand-light hover:underline">Log in here</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
