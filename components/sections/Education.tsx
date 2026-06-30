'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const qualifications = [
  { code: 'RE5', title: 'Regulatory Exam (Level 5)', body: 'Mandatory for all Financial Services Representatives (FSRs). Tests knowledge of Regulation of Insurance Industry Act, product rules, and client treatment obligations.', level: 'NQF 4', duration: 'Self-study, exam-based' },
  { code: 'RE1', title: 'Regulatory Exam (Level 1)', body: 'Required for Key Individuals (KIs) managing FSPs. Higher-level understanding of regulatory responsibilities and business conduct.', level: 'NQF 5', duration: 'Self-study, exam-based' },
  { code: 'IISA', title: 'Insurance Institute of SA', body: 'Offers professional designations including FIISA, AIISA, and MIISA. Broad industry education from entry-level to fellowship.', level: 'NQF 4–8', duration: '1–3 years' },
  { code: 'FPI', title: 'Financial Planning Institute', body: 'CFP® certification — the gold standard in financial planning. Comprehensive study of insurance, investment, estate planning, and tax.', level: 'NQF 7', duration: '3–5 years' },
  { code: 'ACII', title: 'Chartered Insurance Institute', body: 'UK-based, globally recognised. ACII designation for short-term and commercial insurance professionals. Available via distance learning.', level: 'NQF 7', duration: '2–4 years' },
  { code: 'B.Com', title: 'Risk & Insurance (University)', body: 'University degrees in risk management and insurance offered at UNISA, Wits, and others. Strong foundation for actuarial or underwriting careers.', level: 'NQF 7–8', duration: '3–4 years' },
];

export default function Education() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="education" className="bg-gray-100 py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="flex flex-col lg:flex-row lg:items-end gap-8 mb-20">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={headInView ? { opacity: 1 } : {}}
              className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
            >
              Qualifications & Learning
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-chalk leading-none"
              style={{ fontSize: 'clamp(48px, 7vw, 100px)', letterSpacing: '0.02em' }}
            >
              INSURANCE<br />EDUCATION
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:max-w-xs font-body text-gray-500 text-sm leading-relaxed lg:pb-4"
          >
            The right qualification opens the right doors. Here&apos;s a clear map of the credentials that matter in the insurance industry.
          </motion.p>
        </div>

        <div className="space-y-0">
          {qualifications.map((q, i) => (
            <motion.div
              key={q.code}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group grid grid-cols-1 md:grid-cols-[120px_1fr_1fr_160px] gap-6 items-center py-8 border-b border-gray-200 hover:bg-gray-50 px-0 hover:px-4 transition-all duration-300"
            >
              <div className="font-display text-3xl text-chalk tracking-wide">{q.code}</div>
              <div>
                <h3 className="font-heading text-lg text-chalk mb-1">{q.title}</h3>
                <span className="inline-block font-body text-xs tracking-wider uppercase border border-gray-300 text-gray-500 px-2 py-0.5">{q.level}</span>
              </div>
              <p className="font-body text-sm text-gray-600 leading-relaxed">{q.body}</p>
              <div className="text-right">
                <p className="font-body text-xs text-gray-400 mb-1">Duration</p>
                <p className="font-body text-sm text-gray-600">{q.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-300"
        >
          {[
            { stat: '40+', label: 'CPD Hours Required', note: 'Per year for licensed advisors' },
            { stat: 'RE5', label: 'First Step', note: 'For all new entrants to the industry' },
            { stat: '2026', label: 'Conduct Standard', note: 'New IRCSL conduct standard in effect' },
          ].map((item) => (
            <div key={item.stat} className="bg-gray-100 p-10">
              <p className="font-display text-5xl md:text-7xl text-chalk mb-3">{item.stat}</p>
              <p className="font-heading text-lg text-chalk mb-1">{item.label}</p>
              <p className="font-body text-sm text-gray-500">{item.note}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
