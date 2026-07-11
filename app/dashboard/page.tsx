'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthProvider';
import { logout } from '@/lib/customerAuth';

type Quote = {
  id: string;
  reference?: string;
  product_label?: string;
  status?: string;
  not_finalised?: boolean;
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

/** One line telling the customer what happens next at this stage. */
function nextStepOf(q: Quote): string {
  const st = stageOf(q);
  if (st.closed) return 'This request has been closed. Start a new one any time.';
  if (st.index === 0) return 'Our brokers are reviewing your request — we’ll call you shortly.';
  if (st.index === 1) {
    const n = q.sent_to?.length ?? 0;
    return `We’re collecting quotes from ${n > 0 ? n : 'our panel of'} insurer${n === 1 ? '' : 's'} for you.`;
  }
  if (st.index === 2) {
    const n = q.responses?.length ?? 0;
    return `${n} quote${n === 1 ? '' : 's'} received — our broker will call you with the comparison.`;
  }
  return 'Confirmed — our team is finalising your policy documents.';
}

function fmtDate(q: Quote): string {
  const d = q.created_at?.toDate?.();
  return d
    ? d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '';
}

function DashboardInner() {
  const router = useRouter();
  const params = useSearchParams();
  const justSubmitted = params.get('submitted') === '1';
  const { user, profile, loading } = useAuth();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/login?next=/dashboard');
    // Google sign-ins must add a phone number before using the dashboard
    if (!loading && user && profile !== null && !profile?.phone && user.providerData?.some(p => p?.providerId === 'google.com')) {
      router.replace('/complete-profile?next=/dashboard');
    }
  }, [loading, user, profile, router]);

  const loadQuotes = useCallback(async (uid: string) => {
    setFetching(true);
    setFetchError('');
    try {
      const snap = await getDocs(query(collection(db, 'quotes'), where('customer_uid', '==', uid)));
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Quote, 'id'>) }));
      list.sort((a, b) => (b.created_at?.toDate?.()?.getTime() || 0) - (a.created_at?.toDate?.()?.getTime() || 0));
      setQuotes(list);
    } catch {
      setFetchError('We couldn’t load your requests. Check your connection and try again.');
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (user) loadQuotes(user.uid);
  }, [user, loadQuotes]);

  const handleLogout = async () => {
    try { await logout(); } catch { /* ignore */ }
    router.replace('/');
  };

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-ink flex items-center justify-center">
        <p className="text-gray-500 font-body text-sm">Loading…</p>
      </main>
    );
  }

  const firstName = (profile?.full_name || user.displayName || '').split(' ')[0] || 'there';

  const counts = {
    total: quotes.length,
    review: quotes.filter((q) => { const s = stageOf(q); return !s.closed && s.index <= 1; }).length,
    ready: quotes.filter((q) => stageOf(q).index === 2).length,
    confirmed: quotes.filter((q) => stageOf(q).index === 3).length,
  };

  return (
    <main className="min-h-screen bg-ink bg-brand-radial pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
          <div>
            <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-3">Your dashboard</p>
            <h1 className="font-display text-chalk text-5xl tracking-wide">HELLO, {firstName.toUpperCase()}</h1>
          </div>
          <button onClick={handleLogout}
            className="font-body text-xs tracking-widest uppercase text-gray-500 hover:text-brand transition-colors border border-gray-700 rounded-lg px-4 py-2 mt-2">
            Log out
          </button>
        </div>

        {/* Account line: phone + verification status */}
        <div className="flex items-center gap-3 flex-wrap mb-8">
          {profile?.phone && <p className="font-body text-sm text-gray-400">{profile.phone}</p>}
          {profile?.phone_verified ? (
            <span className="font-body text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-brand-gradient-soft text-brand border border-brand/30">
              ✓ Number verified
            </span>
          ) : (
            <span className="font-body text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-gray-900 text-gray-500 border border-gray-700"
              title="We confirm your number when our broker first calls you — nothing for you to do.">
              Verification on first call
            </span>
          )}
        </div>

        {justSubmitted && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl border border-brand/40 bg-brand-gradient-soft px-5 py-4">
            <p className="font-body text-sm text-chalk">
              ✅ Request received — our brokers are on it. We&apos;ll call you to confirm the details.
            </p>
          </motion.div>
        )}

        {/* ── Stats ── */}
        {quotes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: 'Total requests', val: counts.total },
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
        )}

        {/* ── Requests ── */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-chalk text-xl">My quote requests</h2>
          <Link href="/get-quote" className="btn-brand px-6 py-2.5 text-xs">New request</Link>
        </div>

        {fetching ? (
          <p className="text-gray-500 font-body text-sm">Loading your requests…</p>
        ) : fetchError ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8 text-center">
            <p className="font-body text-sm text-gray-400 mb-4">{fetchError}</p>
            <button onClick={() => loadQuotes(user.uid)} className="btn-brand px-8">Try again</button>
          </div>
        ) : quotes.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-10">
            <p className="font-heading text-chalk text-lg text-center mb-8">Get your first quote in three easy steps</p>
            <div className="grid sm:grid-cols-3 gap-6 mb-9">
              {[
                { n: '1', t: 'Tell us what you need', d: 'Pick a cover — motor, life, home or business — and fill in the basics. Takes 2 minutes.' },
                { n: '2', t: 'We shop the market', d: 'Our brokers collect quotes from Sri Lanka’s leading insurers on your behalf.' },
                { n: '3', t: 'Compare & choose', d: 'We call you with a clear comparison — you pick the best cover, we handle the rest.' },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient text-white font-display text-lg flex items-center justify-center mx-auto mb-3">{s.n}</div>
                  <p className="font-heading text-chalk text-sm mb-1.5">{s.t}</p>
                  <p className="font-body text-xs text-gray-500 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/get-quote" className="btn-brand px-10">Get your first quote</Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {quotes.map((q) => {
              const st = stageOf(q);
              return (
                <div key={q.id} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-1.5">
                    <div>
                      <h3 className="font-heading text-chalk text-lg">{q.product_label || 'Insurance'}</h3>
                      <p className="font-body text-xs text-gray-500 mt-0.5">
                        {q.reference}{fmtDate(q) && <> · Requested {fmtDate(q)}</>}
                      </p>
                    </div>
                    <span className={`font-body text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full ${
                      st.closed ? 'bg-gray-700/40 text-gray-400' : 'bg-brand-gradient-soft text-brand-light border border-brand/30'
                    }`}>
                      {st.label}
                    </span>
                  </div>

                  <p className="font-body text-xs text-gray-400 mb-5">{nextStepOf(q)}</p>

                  {!st.closed && (
                    <div className="flex items-center">
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

        {/* ── Help ── */}
        <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-900/60 px-6 py-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-heading text-chalk text-sm mb-0.5">Need a hand or want to update a request?</p>
            <p className="font-body text-xs text-gray-500">Our brokers are happy to help — no obligation, no jargon.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+94773057892" className="font-body text-sm text-brand hover:underline">077 305 7892</a>
            <a href="mailto:info@ceilaoib.lk" className="font-body text-sm text-brand hover:underline">info@ceilaoib.lk</a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-ink" />}>
      <DashboardInner />
    </Suspense>
  );
}
