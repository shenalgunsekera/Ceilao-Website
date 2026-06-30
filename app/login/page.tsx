'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { loginWithPhonePassword } from '@/lib/customerAuth';

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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

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
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="bg-ink border border-gray-700 rounded-lg px-4 py-3 text-chalk font-body text-sm outline-none focus:border-brand transition-colors"
            />
          </label>
          {error && (
            <div className="rounded-lg bg-brand-600/15 border border-brand-600/30 px-3 py-2">
              <p className="font-body text-xs text-brand-300">{error}</p>
            </div>
          )}
          <button onClick={submit} disabled={busy} className="btn-brand mt-1">
            {busy ? 'Logging in…' : 'Log in'}
          </button>
          <p className="text-center font-body text-xs text-gray-500 mt-1">
            New to Ceilao?{' '}
            <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-brand-light hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
