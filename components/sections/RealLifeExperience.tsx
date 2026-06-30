'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const stories = [
  {
    name: 'Thabo M.',
    location: 'Johannesburg',
    type: 'Life Insurance',
    outcome: 'Positive',
    headline: '"My broker saved my family from losing our home."',
    story: 'When my wife passed away suddenly, the last thing I expected was a smooth claims process. Our broker had structured her life policy correctly — the mortgage protection benefit paid out within two weeks. I didn\'t know that was even possible.',
    lesson: 'Always ensure your life cover is linked to your bond. Your broker should review this annually.',
  },
  {
    name: 'Priya K.',
    location: 'Cape Town',
    type: 'Business Insurance',
    outcome: 'Learning',
    headline: '"I thought I was covered. I wasn\'t."',
    story: 'A burst pipe flooded our retail store during December peak season. I had property cover but not business interruption insurance. We lost three weeks of trading — R280,000 — with no claim possible. It nearly broke us.',
    lesson: 'Business interruption cover is not optional for retail. Review your exclusions before renewal, not after a loss.',
  },
  {
    name: 'Johan & Anri V.',
    location: 'Pretoria',
    type: 'Medical Aid',
    outcome: 'Positive',
    headline: '"Disability cover was the policy we never thought we\'d use."',
    story: 'Johan\'s accident left him unable to work for eight months. Because we\'d added income protection five years earlier at our broker\'s insistence, we received 75% of his salary every month. We didn\'t miss a single bond payment.',
    lesson: 'Income protection is the most underrated policy in Sri Lanka. If you work, you need it.',
  },
  {
    name: 'Nomsa D.',
    location: 'Durban',
    type: 'Motor Insurance',
    outcome: 'Learning',
    headline: '"Comprehensive cover, but my claim was still rejected."',
    story: 'I had comprehensive motor cover but hadn\'t disclosed a previous accident at inception. When my car was written off in a collision, the insurer repudiated the claim on non-disclosure grounds. I had to fight through the Ombudsman to get a partial settlement.',
    lesson: 'Full disclosure is not optional. Even minor accidents must be declared when applying for cover.',
  },
];

const outcomeColors = {
  Positive: 'text-gray-300 border-gray-600',
  Learning: 'text-gray-500 border-gray-700',
};

export default function RealLifeExperience() {
  const [active, setActive] = useState(0);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });
  const story = stories[active];

  return (
    <section id="experience" className="bg-ink py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
          >
            Real People. Real Claims.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-chalk leading-none"
            style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '0.02em' }}
          >
            REAL LIFE<br />INSURANCE<br />EXPERIENCE
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Story selector */}
          <div className="space-y-0">
            {stories.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActive(i)}
                className={`w-full text-left p-6 border-b border-gray-800 transition-all duration-300 ${
                  active === i ? 'bg-gray-900 border-l-2 border-l-chalk' : 'hover:bg-gray-900/30'
                }`}
              >
                <p className={`font-body text-xs tracking-wider uppercase mb-2 border px-2 py-0.5 inline-block ${outcomeColors[s.outcome as keyof typeof outcomeColors]}`}>
                  {s.outcome}
                </p>
                <p className="font-heading text-chalk text-sm mb-1">{s.name}</p>
                <p className="font-body text-xs text-gray-600">{s.location} · {s.type}</p>
              </button>
            ))}
          </div>

          {/* Story detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center font-display text-xl text-chalk">
                  {story.name[0]}
                </div>
                <div>
                  <p className="font-heading text-chalk">{story.name}</p>
                  <p className="font-body text-xs text-gray-500">{story.location} · {story.type}</p>
                </div>
              </div>

              <blockquote className="font-heading italic text-2xl md:text-3xl text-chalk leading-snug mb-8">
                {story.headline}
              </blockquote>

              <p className="font-body text-gray-400 leading-relaxed text-sm mb-10">
                {story.story}
              </p>

              <div className="p-6 bg-gray-900 border-l-2 border-chalk">
                <p className="font-body text-xs tracking-widest uppercase text-gray-500 mb-2">Coach&apos;s Lesson</p>
                <p className="font-body text-sm text-gray-300 leading-relaxed">{story.lesson}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
