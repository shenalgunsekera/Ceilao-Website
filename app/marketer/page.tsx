'use client';

// Marketer portal: field marketers log in with the Marketer ID + password that
// staff created for them in the Admin Panel. They see ONLY their own clients'
// quote requests, get their personal affiliate link, and can start a new quote
// for a client they're sitting with (POS) — it's auto-tagged to them.

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthProvider';
import {
  loginMarketer, logoutMarketer, getMarketerProfile, type MarketerProfile,
} from '@/lib/marketerAuth';
import EyeToggle from '@/components/ui/EyeToggle';

type Quote = {
  id: string;
  reference?: string;
  product_label?: string;
  status?: string;
  not_finalised?: boolean;
  source?: string;
  client_name?: string;
  client_mobile?: string;
  sent_to?: unknown[];
  responses?: unknown[];
  created_at?: { toDate?: () => Date };
};

const STAGES = ['Submitted', 'In Review', 'Quotes Ready', 'Confirmed'];

function stageOf(q: Quote): { label: string; index: number; closed?: boolean } {
  if (q.not_finalised || q.status === 'not_finalised') return { label: 'Closed', index: -1, closed: true };
  if (q.status === 'confirmed') return { label: 'Confirmed', index: 3 };
  if ((q.responses?.length ?? 0) > 0) return { label: 'Quotes Ready', index: 2 };
  if (q.status === 'sent' || (q.sent_to?.length ?? 0) > 0) return { label: 'In Review', index: 1 };
  return { label: 'Submitted', index: 0 };
}

export default function MarketerPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [marketer, setMarketer] = useState<MarketerProfile | null>(null);
  const [checking, setChecking] = useState(true);

  // login form
  const [mid, setMid] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // dashboard
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [copied, setCopied] = useState(false);

  // Resolve whether the signed-in user is a marketer
  useEffect(() => {
    if (loading) return;
    if (!user) { setMarketer(null); setChecking(false); return; }
    let cancelled = false;
    getMarketerProfile(user.uid).then((m) => {
      if (!cancelled) { setMarketer(m); setChecking(false); }
    });
    return () => { cancelled = true; };
  }, [user, loading]);

  const loadQuotes = useCallback(async (marketerId: string) => {
    setFetching(true);
    setFetchError('');
    try {
      const snap = await getDocs(query(collection(db, 'quotes'), where('marketer_id', '==', marketerId)));
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Quote, 'id'>) }));
      list.sort((a, b) => (b.created_at?.toDate?.()?.getTime() || 0) - (a.created_at?.toDate?.()?.getTime() || 0));
      setQuotes(list);
    } catch {
      setFetchError('Could not load your clients. Check your connection and try again.');
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (marketer?.marketer_id) loadQuotes(marketer.marketer_id);
  }, [marketer, loadQuotes]);

  const submit = async () => {
    setError('');
    setBusy(true);
    try {
      await loginMarketer(mid, password);
      // profile effect re-runs via auth state change
    } catch (err: unknown) {
      const c = (err as { code?: string })?.code || '';
      if (c === 'auth/invalid-credential' || c === 'auth/wrong-password' || c === 'auth/user-not-found')
        setError('Incorrect marketer ID or password.');
      else setError((err as Error)?.message || 'Could not log in. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    try { await logoutMarketer(); } catch { /* ignore */ }
    setMarketer(null);
    router.replace('/marketer');
  };

  const affiliateLink = marketer
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/get-quote?ref=${marketer.marketer_id}`
    : '';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  if (loading || checking) {
    return <main className="min-h-screen bg-ink flex items-center justify-center"><p className="text-gray-500 font-body text-sm">Loading…</p></main>;
  }

  /* ── LOGIN VIEW ── */
  if (!marketer) {
    return (
      <main className="min-h-screen bg-ink bg-brand-radial flex items-center justify-center px-6 pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-3">Marketer portal</p>
            <h1 className="font-display text-chalk text-4xl tracking-wide">
              MARKETER <span className="bg-brand-gradient bg-clip-text text-transparent">LOG IN</span>
            </h1>
            <p className="mt-3 font-body text-sm text-gray-400">
              Use the marketer ID and password given to you by the office.
            </p>
          </div>
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-7 backdrop-blur flex flex-col gap-4">
            {user && (
              <div className="rounded-lg bg-gray-900 border border-gray-700 px-3 py-2">
                <p className="font-body text-xs text-gray-500">
                  You&apos;re signed in with a customer account.{' '}
                  <button onClick={handleLogout} className="text-brand-light hover:underline">Sign out</button> to log in as a marketer.
                </p>
              </div>
            )}
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-[11px] tracking-widest uppercase text-gray-500">Marketer ID</span>
              <input type="text" value={mid} onChange={(e) => setMid(e.target.value.toUpperCase())} placeholder="MKT001"
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="bg-ink border border-gray-700 rounded-lg px-4 py-3 text-chalk font-body text-sm outline-none focus:border-brand transition-colors" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-[11px] tracking-widest uppercase text-gray-500">Password</span>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  className="bg-ink border border-gray-700 rounded-lg px-4 py-3 pr-11 text-chalk font-body text-sm outline-none focus:border-brand transition-colors w-full" />
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
            <p className="text-center font-body text-[11px] text-gray-600">
              Customer? <Link href="/login" className="text-brand-light hover:underline">Log in here</Link>
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  /* ── DASHBOARD VIEW ── */
  const counts = {
    total: quotes.length,
    review: quotes.filter((q) => { const s = stageOf(q); return !s.closed && s.index <= 1; }).length,
    ready: quotes.filter((q) => stageOf(q).index === 2).length,
    confirmed: quotes.filter((q) => stageOf(q).index === 3).length,
  };

  return (
    <main className="min-h-screen bg-ink bg-brand-radial pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
          <div>
            <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-3">Marketer portal</p>
            <h1 className="font-display text-chalk text-5xl tracking-wide">
              {(marketer.full_name || marketer.marketer_id).toUpperCase()}
            </h1>
            <p className="font-body text-sm text-gray-400 mt-1">
              Marketer ID: <span className="text-chalk font-semibold">{marketer.marketer_id}</span>
              {marketer.active === false && (
                <span className="ml-2 font-body text-[11px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-gray-800 text-gray-500">Deactivated</span>
              )}
            </p>
          </div>
          <button onClick={handleLogout}
            className="font-body text-xs tracking-widest uppercase text-gray-500 hover:text-brand transition-colors border border-gray-700 rounded-lg px-4 py-2 mt-2">
            Log out
          </button>
        </div>

        {/* Affiliate link + POS action */}
        <div className="grid sm:grid-cols-[1.6fr_1fr] gap-3 mt-6 mb-8">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-5 py-4">
            <p className="font-body text-[11px] tracking-widest uppercase text-gray-500 mb-1.5">Your affiliate link — share with clients</p>
            <div className="flex items-center gap-2 flex-wrap">
              <code className="font-body text-xs text-brand break-all">{affiliateLink}</code>
              <button onClick={copyLink}
                className="font-body text-[11px] tracking-widest uppercase border border-brand/40 text-brand rounded-lg px-3 py-1.5 hover:bg-brand hover:text-white transition-colors shrink-0">
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <p className="font-body text-[11px] text-gray-600 mt-2">
              Quotes submitted through this link are credited to you automatically.
            </p>
          </div>
          <Link href="/get-quote"
            className="rounded-2xl border border-brand/40 bg-brand-gradient-soft px-5 py-4 flex flex-col justify-center hover:-translate-y-0.5 transition-transform">
            <p className="font-heading text-chalk text-base mb-1">+ New quote for a client</p>
            <p className="font-body text-xs text-gray-500">Fill the form with the client — it&apos;s tagged to you.</p>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: 'My clients’ quotes', val: counts.total },
            { label: 'In review', val: counts.review },
            { label: 'Quotes ready', val: counts.ready },
            { label: 'Confirmed', val: counts.confirmed },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-800 bg-gray-900/60 px-5 py-4">
              <p className="font-display text-3xl text-brand">{s.val}</p>
              <p className="font-body text-[11px] tracking-widest uppercase text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quotes list */}
        <h2 className="font-heading text-chalk text-xl mb-5">My clients&apos; requests</h2>
        {fetching ? (
          <p className="text-gray-500 font-body text-sm">Loading…</p>
        ) : fetchError ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8 text-center">
            <p className="font-body text-sm text-gray-400 mb-4">{fetchError}</p>
            <button onClick={() => loadQuotes(marketer.marketer_id)} className="btn-brand px-8">Try again</button>
          </div>
        ) : quotes.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-10 text-center">
            <p className="font-body text-sm text-gray-400 mb-2">No client requests yet.</p>
            <p className="font-body text-xs text-gray-500 mb-5">
              Share your affiliate link, or sit with a client and start their quote yourself.
            </p>
            <Link href="/get-quote" className="btn-brand px-8">Start a quote for a client</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {quotes.map((q) => {
              const st = stageOf(q);
              const d = q.created_at?.toDate?.();
              return (
                <div key={q.id} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-1.5">
                    <div>
                      <h3 className="font-heading text-chalk text-lg">
                        {q.client_name || 'Client'} — {q.product_label || 'Insurance'}
                      </h3>
                      <p className="font-body text-xs text-gray-500 mt-0.5">
                        {q.reference}
                        {q.client_mobile && <> · {q.client_mobile}</>}
                        {d && <> · {d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</>}
                        {q.source === 'marketer' ? ' · Entered by you' : ' · Via your link'}
                      </p>
                    </div>
                    <span className={`font-body text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full ${
                      st.closed ? 'bg-gray-700/40 text-gray-400' : 'bg-brand-gradient-soft text-brand-light border border-brand/30'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                  {!st.closed && (
                    <div className="flex items-center mt-4">
                      {STAGES.map((s, i) => (
                        <div key={s} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${i <= st.index ? 'bg-brand' : 'bg-gray-700'}`} />
                            <span className={`mt-2 font-body text-[10px] tracking-wide uppercase ${i <= st.index ? 'text-brand-light' : 'text-gray-600'}`}>{s}</span>
                          </div>
                          {i < STAGES.length - 1 && (
                            <div className={`h-px flex-1 mx-1 mb-5 ${i < st.index ? 'bg-brand' : 'bg-gray-700'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
