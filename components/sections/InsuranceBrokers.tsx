'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  { step: '01', title: 'Assessment', desc: 'A broker evaluates your unique risks, assets, income, and lifestyle to understand exactly what coverage you need.' },
  { step: '02', title: 'Market Access', desc: 'Unlike direct insurers, brokers shop multiple providers simultaneously, finding the best cover at the best price for you.' },
  { step: '03', title: 'Advice', desc: 'You receive professional, legally compliant advice tailored to your circumstances — not a script from a call centre.' },
  { step: '04', title: 'Claims Support', desc: 'When things go wrong, your broker fights your corner. They manage the claims process and advocate on your behalf.' },
];

export default function InsuranceBrokers() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="brokers" className="bg-ink py-24 md:py-36 relative overflow-hidden">
      {/* Background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-gray-900/30 leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: 'clamp(100px, 18vw, 240px)', letterSpacing: '0.02em' }}
      >
        BROKER
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
          >
            Your Advocate
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-chalk leading-none"
            style={{ fontSize: 'clamp(56px, 8vw, 120px)', letterSpacing: '0.02em' }}
          >
            INSURANCE<br />BROKERS
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading italic text-xl md:text-2xl text-gray-300 leading-relaxed mb-10"
            >
              A broker works for you — not the insurance company. They are your trusted advisor in a complex market.
            </motion.p>

            <div className="space-y-8">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <span className="font-display text-4xl text-gray-700 shrink-0 leading-none pt-1">{s.step}</span>
                  <div>
                    <h3 className="font-heading text-lg text-chalk mb-2">{s.title}</h3>
                    <p className="font-body text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 p-10"
          >
            <p className="font-body text-xs tracking-widest uppercase text-gray-500 mb-8">Broker vs Direct — At a Glance</p>
            <div className="space-y-0">
              {(
                [
                  ['Independent advice', 'yes', 'no'],
                  ['Multiple insurer access', 'yes', 'no'],
                  ['Claims advocacy', 'yes', 'no'],
                  ['24/7 digital access', 'no', 'yes'],
                  ['Lower premiums', 'varies', 'yes'],
                  ['Personalised service', 'yes', 'no'],
                ] as [string, string, string][]
              ).map(([label, broker, direct], i) => {
                const cell = (v: string) =>
                  v === 'yes' ? <span className="text-chalk">✓</span> :
                  v === 'no' ? <span className="text-gray-700">—</span> :
                  <span className="text-gray-400">{v}</span>;
                return (
                  <div key={i} className="grid grid-cols-3 py-4 border-b border-gray-800 text-sm">
                    <span className="font-body text-gray-400 col-span-1">{label}</span>
                    <span className="text-center">{cell(broker)}</span>
                    <span className="text-center">{cell(direct)}</span>
                  </div>
                );
              })}
              <div className="grid grid-cols-3 pt-4">
                <span className="font-body text-gray-700 text-xs" />
                <span className="text-center font-body text-xs tracking-wider text-gray-500 uppercase">Broker</span>
                <span className="text-center font-body text-xs tracking-wider text-gray-500 uppercase">Direct</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
