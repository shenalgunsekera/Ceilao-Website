'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const regulatorData = {
  regulator: {
    id: 'regulator',
    title: 'Insurance Regulator',
    badge: 'IRCSL',
    full: 'Insurance Regulatory Commission of Sri Lanka',
    color: 'bg-brand text-white',
    description:
      'The IRCSL is the statutory body that regulates, supervises and develops the insurance industry in Sri Lanka under the Regulation of Insurance Industry Act No. 43 of 2000. It safeguards policyholders and keeps the market sound and trustworthy.',
    points: [
      'Licenses and supervises all insurers and insurance brokers',
      'Protects the interests of policyholders',
      'Sets rules of conduct and solvency for the industry',
      'Investigates misconduct and takes enforcement action',
      'Maintains the public register of licensed insurers and brokers',
    ],
    action: 'Check that your insurer — and your broker — are licensed by the IRCSL before you sign. Ceilao Insurance Brokers is a licensed broker.',
  },
  ombudsman: {
    id: 'ombudsman',
    title: 'Insurance Ombudsman',
    badge: 'IOSL',
    full: 'Insurance Ombudsman of Sri Lanka',
    color: 'bg-brand text-white border border-gray-700',
    description:
      'If you have a dispute with your insurer that cannot be resolved directly, the Insurance Ombudsman of Sri Lanka offers a free, independent and impartial way to settle eligible claim and policy complaints — without going to court.',
    points: [
      'Handles complaints against member insurance companies',
      'Completely free of charge to policyholders',
      'Independent and impartial — not on the insurer’s side',
      'Recommendations are binding on the insurer, not on you',
      'Try to resolve directly with your insurer first',
    ],
    action: 'Raise it with your insurer first. If still unresolved, escalate to the Insurance Ombudsman of Sri Lanka — or let your Ceilao broker advocate for you at no extra cost.',
  },
};

export default function Regulatory({ defaultTab = 'regulator' }: { defaultTab?: 'regulator' | 'ombudsman' }) {
  const [active, setActive] = useState<'regulator' | 'ombudsman'>(defaultTab);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });
  const data = regulatorData[active];

  return (
    <section id="regulator" className="bg-gray-100 py-24 md:py-36">
      <div id="ombudsman" className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
          >
            Consumer Protection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-chalk leading-none"
            style={{ fontSize: 'clamp(48px, 7vw, 100px)', letterSpacing: '0.02em' }}
          >
            YOUR RIGHTS &amp;<br />PROTECTION
          </motion.h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-12">
          {(['regulator', 'ombudsman'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-6 py-3 font-body text-xs tracking-widest uppercase transition-all duration-300 border ${
                active === tab
                  ? 'bg-brand text-white border-brand'
                  : 'bg-transparent text-gray-500 border-gray-300 hover:border-brand hover:text-chalk'
              }`}
            >
              {tab === 'regulator' ? 'Regulator (IRCSL)' : 'Ombudsman (IOSL)'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className={`font-display text-sm tracking-wider px-4 py-2 ${data.color}`}>
                  {data.badge}
                </span>
                <span className="font-body text-xs text-gray-500">{data.full}</span>
              </div>
              <h3 className="font-heading text-3xl md:text-4xl text-chalk mb-6">{data.title}</h3>
              <p className="font-body text-gray-600 leading-relaxed mb-8">{data.description}</p>
              <div className="p-6 bg-gray-100 border-l-2 border-brand">
                <p className="font-body text-xs tracking-widest uppercase text-gray-500 mb-2">Action Point</p>
                <p className="font-heading italic text-chalk">{data.action}</p>
              </div>
            </div>

            <div className="space-y-0">
              <p className="font-body text-xs tracking-widest uppercase text-gray-400 mb-6">Key Functions</p>
              {data.points.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 py-4 border-b border-gray-200"
                >
                  <span className="font-display text-2xl text-gray-300 leading-none shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-sm text-gray-700 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
