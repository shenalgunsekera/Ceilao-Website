'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthProvider';

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

function DashboardInner() {
  const router = useRouter();
  const params = useSearchParams();
  const justSubmitted = params.get('submitted') === '1';
  const { user, profile, loading } = useAuth();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace('/login?next=/dashboard');
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, 'quotes'), where('customer_uid', '==', user.uid)));
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Quote, 'id'>) }));
        list.sort((a, b) => (b.created_at?.toDate?.()?.getTime() || 0) - (a.created_at?.toDate?.()?.getTime() || 0));
        setQuotes(list);
      } finally {
        setFetching(false);
      }
    })();
  }, [user]);

  if (loading || !user) {
    return <main className="min-h-screen bg-ink flex items-center justify-center"><p className="text-gray-500 font-body text-sm">Loading…</p></main>;
  }

  const firstName = (profile?.full_name || '').split(' ')[0] || 'there';

  return (
    <main className="min-h-screen bg-ink bg-brand-radial pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-3">Your dashboard</p>
        <h1 className="font-display text-chalk text-5xl tracking-wide mb-2">HELLO, {firstName.toUpperCase()}</h1>
        <p className="font-body text-sm text-gray-400 mb-8">Track every quote request in one place.</p>

        {justSubmitted && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl border border-brand/40 bg-brand-gradient-soft px-5 py-4">
            <p className="font-body text-sm text-chalk">
              ✅ Request received — we&apos;ve emailed your confirmation. Our brokers are on it.
            </p>
          </motion.div>
        )}

        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-chalk text-xl">My quote requests</h2>
          <Link href="/get-quote" className="btn-brand px-6 py-2.5 text-xs">New request</Link>
        </div>

        {fetching ? (
          <p className="text-gray-500 font-body text-sm">Loading your requests…</p>
        ) : quotes.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-10 text-center">
            <p className="font-body text-sm text-gray-400 mb-4">You haven&apos;t requested any quotes yet.</p>
            <Link href="/get-quote" className="btn-brand px-8">Get your first quote</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {quotes.map((q) => {
              const st = stageOf(q);
              return (
                <div key={q.id} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                    <div>
                      <h3 className="font-heading text-chalk text-lg">{q.product_label || 'Insurance'}</h3>
                      <p className="font-body text-xs text-gray-500 mt-0.5">{q.reference}</p>
                    </div>
                    <span className={`font-body text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full ${
                      st.closed ? 'bg-gray-700/40 text-gray-400' : 'bg-brand-gradient-soft text-brand-light border border-brand/30'
                    }`}>
                      {st.label}
                    </span>
                  </div>
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
