'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import type { ConfirmationResult } from 'firebase/auth';
import {
  normalisePhone,
  makeRecaptcha,
  sendSignupOtp,
  confirmSignup,
} from '@/lib/customerAuth';
import EyeToggle from '@/components/ui/EyeToggle';

export default function SignupPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-ink" />}>
      <SignupInner />
    </Suspense>
  );
}

function SignupInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard';

  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [code, setCode] = useState('');
  const [e164, setE164] = useState('');
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const sendCode = async () => {
    setError('');
    if (!fullName.trim()) return setError('Please enter your full name.');
    const norm = normalisePhone(phone);
    if (!norm) return setError('Enter a valid Sri Lankan mobile number (e.g. 077 123 4567).');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirm) return setError('Passwords do not match.');

    setBusy(true);
    try {
      const verifier = makeRecaptcha('recaptcha-container');
      const conf = await sendSignupOtp(norm, verifier);
      setConfirmation(conf);
      setE164(norm);
      setStep(2);
    } catch (err: unknown) {
      const c = (err as { code?: string })?.code || '';
      if (c === 'auth/billing-not-enabled')
        setError('SMS verification is not enabled yet (Firebase Blaze plan required).');
      else if (c === 'auth/captcha-check-failed')
        setError('This domain isn’t authorised for SMS verification. Open the site on an authorised domain (e.g. localhost or ceilaoib.lk), not a raw IP address.');
      else if (c === 'auth/operation-not-allowed')
        setError('Phone sign-in is not enabled in Firebase yet.');
      else if (c.includes('-39') || (err as Error)?.message?.includes('-39'))
        setError('Verification couldn’t start. Please tap “Send verification code” again. If it keeps failing, SMS (Blaze plan) may not be enabled yet.');
      else setError((err as Error)?.message || 'Could not send the code. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const verify = async () => {
    setError('');
    if (!confirmation) return;
    if (code.trim().length < 4) return setError('Enter the 6-digit code from the SMS.');
    setBusy(true);
    try {
      await confirmSignup(confirmation, code.trim(), { fullName: fullName.trim(), e164, password });
      router.push(next);
    } catch (err: unknown) {
      const c = (err as { code?: string })?.code || '';
      if (c === 'auth/invalid-verification-code') setError('That code is incorrect. Please re-check.');
      else if (c === 'auth/email-already-in-use')
        setError('An account already exists for this phone number. Please log in instead.');
      else setError((err as Error)?.message || 'Verification failed. Try again.');
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
          <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-3">Create your account</p>
          <h1 className="font-display text-chalk text-4xl tracking-wide">
            JOIN <span className="bg-brand-gradient bg-clip-text text-transparent">CEILAO</span>
          </h1>
          <p className="mt-3 font-body text-sm text-gray-400">
            One account to request quotes and track every policy.
          </p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-7 backdrop-blur">
          {step === 1 ? (
            <div className="flex flex-col gap-4">
              <Input label="Full name" value={fullName} onChange={setFullName} placeholder="Nimal Perera" />
              <Input label="Mobile number" value={phone} onChange={setPhone} placeholder="077 123 4567" type="tel" />
              <Input label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" />
              <Input label="Confirm password" value={confirm} onChange={setConfirm} placeholder="••••••••" type="password" />
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <button onClick={sendCode} disabled={busy} className="btn-brand mt-1">
                {busy ? 'Sending code…' : 'Send verification code'}
              </button>
              <p className="text-center font-body text-xs text-gray-500 mt-1">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-light hover:underline">Log in</Link>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="font-body text-sm text-gray-300">
                We sent a 6-digit code to <span className="text-chalk font-semibold">{e164}</span>.
              </p>
              <Input label="Verification code" value={code} onChange={setCode} placeholder="123456" type="tel" />
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <button onClick={verify} disabled={busy} className="btn-brand mt-1">
                {busy ? 'Verifying…' : 'Verify & create account'}
              </button>
              <button onClick={() => { setStep(1); setError(''); }} className="font-body text-xs text-gray-500 hover:text-chalk">
                ← Change details
              </button>
            </div>
          )}
        </div>
        <div id="recaptcha-container" />
      </motion.div>
    </main>
  );
}

function Input({
  label, value, onChange, placeholder, type = 'text',
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  const [show, setShow] = useState(false);
  const isPw = type === 'password';
  const inputType = isPw ? (show ? 'text' : 'password') : type;
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-[11px] tracking-widest uppercase text-gray-500">{label}</span>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`bg-ink border border-gray-700 rounded-lg px-4 py-3 text-chalk font-body text-sm outline-none focus:border-brand transition-colors w-full ${isPw ? 'pr-11' : ''}`}
        />
        {isPw && <EyeToggle show={show} onToggle={() => setShow((s) => !s)} />}
      </div>
    </label>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-brand-600/15 border border-brand-600/30 px-3 py-2">
      <p className="font-body text-xs text-brand-300">{children}</p>
    </div>
  );
}
