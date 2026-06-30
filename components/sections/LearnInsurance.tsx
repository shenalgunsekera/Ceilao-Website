'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const concepts = [
  {
    number: '01',
    title: 'What is Insurance?',
    body: 'Insurance is a contract where you pay a premium to transfer financial risk to an insurer. When a covered loss occurs, the insurer compensates you — protecting your assets, income, and future.',
  },
  {
    number: '02',
    title: 'How Premiums Work',
    body: 'Your premium is calculated based on the probability of a claim and the potential cost. Factors include your age, health, asset value, claims history, and chosen coverage level.',
  },
  {
    number: '03',
    title: 'Excess & Deductibles',
    body: 'The excess is the amount you pay before your insurer covers the rest. Higher excess usually means lower premiums — but you carry more risk in the event of a claim.',
  },
  {
    number: '04',
    title: 'Underwriting Explained',
    body: 'Underwriting is the process of evaluating risk before an insurer accepts a policy. It determines who qualifies for cover and at what price, ensuring the insurer can pay future claims.',
  },
  {
    number: '05',
    title: 'Claims Process',
    body: 'A claim is a formal request for compensation after a loss. You notify your insurer, provide evidence of the event, and an assessor evaluates the claim before payment is made.',
  },
  {
    number: '06',
    title: 'Insurable Interest',
    body: 'You can only insure something you have a financial stake in. This principle prevents insurance from becoming a gambling instrument and ensures legitimate coverage purposes.',
  },
];

function ConceptCard({ concept, index }: { concept: typeof concepts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-gray-800 pt-8 pb-10 hover:border-gray-600 transition-colors duration-300"
    >
      <div className="flex gap-8">
        <span className="font-display text-5xl text-gray-800 group-hover:text-gray-700 transition-colors shrink-0 leading-none">
          {concept.number}
        </span>
        <div>
          <h3 className="font-heading text-xl text-chalk mb-3 group-hover:text-brand-600 transition-colors">
            {concept.title}
          </h3>
          <p className="font-body text-sm text-gray-400 leading-relaxed">{concept.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LearnInsurance() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="learn" className="bg-ink py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end gap-8 mb-20">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
            >
              Foundation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-chalk leading-none"
              style={{ fontSize: 'clamp(56px, 8vw, 120px)', letterSpacing: '0.02em' }}
            >
              LEARN<br />INSURANCE
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-sm font-body text-gray-400 text-sm leading-relaxed md:pb-4"
          >
            Master the fundamentals before you buy a single policy. Understanding how insurance works gives you the power to make decisions that protect what matters most.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16">
          {concepts.map((concept, i) => (
            <ConceptCard key={concept.number} concept={concept} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-16 border-t border-gray-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <p className="font-heading italic text-gray-400 text-lg">
            &ldquo;The best time to understand your insurance is before you need it.&rdquo;
          </p>
          <button className="flex items-center gap-3 font-body text-xs tracking-widest uppercase text-chalk border border-gray-700 px-6 py-3 hover:bg-gray-100 hover:text-chalk transition-all duration-300">
            Start Learning
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
