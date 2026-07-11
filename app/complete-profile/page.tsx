'use client';

// One-time step after a Google sign-in: capture the customer's mobile number.
// Brokers call every customer, and one-account-per-phone is the duplicate
// control, so the dashboard stays locked until a number is claimed.

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthProvider';
import { completeGoogleProfile } from '@/lib/customerAuth';

export default function CompleteProfilePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-ink" />}>
      <CompleteProfileInner />
    </Suspense>
  );
}

function CompleteProfileInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard';
  const { user, profile, loading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
    if (!loading && user && profile?.phone) router.replace(next); // already complete
  }, [loading, user, profile, router, next]);

  useEffect(() => {
    if (user?.displayName && !fullName) setFullName(user.displayName);
  }, [user, fullName]);

  const save = async () => {
    if (!user) return;
    setError('');
    if (!fullName.trim()) return setError('Please enter your full name.');
    setBusy(true);
    try {
      await completeGoogleProfile(user, { fullName: fullName.trim(), rawPhone: phone });
      // Full reload so the AuthProvider picks up the fresh profile
      window.location.assign(next);
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Could not save. Try again.');
      setBusy(false);
    }
  };

  if (loading || !user) {
    return <main className="min-h-screen bg-ink flex items-center justify-center"><p className="text-gray-500 font-body text-sm">Loading…</p></main>;
  }

  return (
    <main className="min-h-screen bg-ink bg-brand-radial flex items-center justify-center px-6 pt-28 pb-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-3">Almost there</p>
          <h1 className="font-display text-chalk text-4xl tracking-wide">ADD YOUR <span className="bg-brand-gradient bg-clip-text text-transparent">MOBILE NUMBER</span></h1>
          <p className="mt-3 font-body text-sm text-gray-400">
            Our brokers call you with your quotes — one account per mobile number.
          </p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-7 backdrop-blur flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[11px] tracking-widest uppercase text-gray-500">Full name</span>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nimal Perera"
              className="bg-ink border border-gray-700 rounded-lg px-4 py-3 text-chalk font-body text-sm outline-none focus:border-brand transition-colors" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[11px] tracking-widest uppercase text-gray-500">Mobile number</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="077 123 4567"
              onKeyDown={(e) => e.key === 'Enter' && save()}
              className="bg-ink border border-gray-700 rounded-lg px-4 py-3 text-chalk font-body text-sm outline-none focus:border-brand transition-colors" />
          </label>
          {error && (
            <div className="rounded-lg bg-brand-600/15 border border-brand-600/30 px-3 py-2">
              <p className="font-body text-xs text-brand-300">{error}</p>
            </div>
          )}
          <button onClick={save} disabled={busy} className="btn-brand mt-1">
            {busy ? 'Saving…' : 'Continue'}
          </button>
          <p className="text-center font-body text-[11px] text-gray-600">
            We&apos;ll confirm this number when our broker first calls you.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
