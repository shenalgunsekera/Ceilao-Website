'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const products = [
  {
    name: 'Term Life',
    tag: 'Pure Protection',
    description: 'Provides a lump-sum death benefit for a fixed period. If you die within the term, your beneficiaries receive the payout. No cash value — affordable and straightforward.',
    ideal: 'Young families, mortgage holders, income protection',
    keyFeature: 'Lowest cost per rupee of cover',
  },
  {
    name: 'Whole of Life',
    tag: 'Lifetime Cover',
    description: 'Permanent cover with a guaranteed payout whenever you die. Premiums are higher but the policy never expires and often builds a surrender value over time.',
    ideal: 'Estate planning, business buy-and-sell agreements',
    keyFeature: 'Guaranteed payout + investment component',
  },
  {
    name: 'Disability Cover',
    tag: 'Income Protection',
    description: 'Replaces a portion of your income if you become disabled and can no longer work. Available as lump sum or monthly income. Critical for all working adults.',
    ideal: 'Professionals, self-employed, primary earners',
    keyFeature: 'Protects up to 75% of pre-disability income',
  },
  {
    name: 'Critical Illness',
    tag: 'Dread Disease',
    description: 'Pays a tax-free lump sum on diagnosis of specified serious conditions like cancer, heart attack, or stroke. Use the payout however you choose.',
    ideal: 'Anyone with a family history of serious illness',
    keyFeature: 'Covers 30+ qualifying conditions',
  },
  {
    name: 'Funeral Cover',
    tag: 'Immediate Payout',
    description: 'Pays within 24–48 hours of a qualifying death to cover burial costs. Can cover multiple family members under a single policy. No medical exam required.',
    ideal: 'All income levels, extended family cover',
    keyFeature: 'Instant payout — no waiting for estate settlement',
  },
  {
    name: 'Endowment',
    tag: 'Savings + Cover',
    description: 'A fixed-term investment policy that pays out at maturity or earlier on death. Forces disciplined savings with a life cover component included.',
    ideal: 'Goal-based savers with a 5–10 year horizon',
    keyFeature: 'Tax-preferred savings wrapper',
  },
];

export default function LifeInsurance() {
  const [hovered, setHovered] = useState<number | null>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="life-insurance" className="bg-ink py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end gap-8 mb-20">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={headInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
            >
              Long-term Insurance
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-chalk leading-none"
              style={{ fontSize: 'clamp(56px, 8vw, 120px)', letterSpacing: '0.02em' }}
            >
              LIFE<br />INSURANCE
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-sm font-body text-gray-400 text-sm leading-relaxed md:pb-4"
          >
            Life insurance isn&apos;t just about death — it&apos;s about protecting the life you&apos;ve built and the people who depend on you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative p-8 transition-colors duration-300 ${
                hovered === i ? 'bg-gray-100' : 'bg-gray-900'
              }`}
            >
              <div className="mb-6">
                <span className={`font-body text-xs tracking-widest uppercase px-3 py-1 border transition-colors duration-300 ${
                  hovered === i ? 'border-brand/30 text-gray-600' : 'border-gray-700 text-gray-500'
                }`}>
                  {product.tag}
                </span>
              </div>
              <h3 className={`font-heading text-2xl mb-4 transition-colors duration-300 ${hovered === i ? 'text-chalk' : 'text-chalk'}`}>
                {product.name}
              </h3>
              <p className={`font-body text-sm leading-relaxed mb-6 transition-colors duration-300 ${hovered === i ? 'text-gray-700' : 'text-gray-400'}`}>
                {product.description}
              </p>
              <div className={`border-t pt-4 transition-colors duration-300 ${hovered === i ? 'border-gray-300' : 'border-gray-800'}`}>
                <p className={`font-body text-xs tracking-wide mb-1 transition-colors duration-300 ${hovered === i ? 'text-gray-500' : 'text-gray-600'}`}>
                  Ideal for
                </p>
                <p className={`font-body text-xs transition-colors duration-300 ${hovered === i ? 'text-gray-700' : 'text-gray-400'}`}>
                  {product.ideal}
                </p>
              </div>
              <div className={`mt-3 py-3 px-4 text-xs font-body transition-colors duration-300 ${
                hovered === i ? 'bg-brand text-white' : 'bg-gray-800 text-gray-300'
              }`}>
                ✦ {product.keyFeature}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
