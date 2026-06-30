'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const companies = [
  { name: 'Sri Lanka Insurance', type: 'Composite', founded: '1962', specialty: 'State insurer — life & general, strong claims record' },
  { name: 'Ceylinco Life', type: 'Life', founded: '1988', specialty: 'One of Sri Lanka’s largest life insurers' },
  { name: 'Union Assurance', type: 'Life', founded: '1987', specialty: 'Life cover, savings & retirement plans' },
  { name: 'AIA Insurance Lanka', type: 'Life & Health', founded: '1987', specialty: 'Life, critical illness & health solutions' },
  { name: 'Allianz Lanka', type: 'General & Life', founded: '2008', specialty: 'Motor, property & global Allianz backing' },
  { name: 'Fairfirst Insurance', type: 'General', founded: '2017', specialty: 'Motor, home, travel & business cover' },
  { name: 'Janashakthi Insurance', type: 'Life', founded: '1994', specialty: 'Life & savings for Sri Lankan families' },
  { name: 'Softlogic Life', type: 'Life & Health', founded: '1999', specialty: 'Fast-growing life & health insurer' },
  { name: 'HNB Assurance', type: 'Life & General', founded: '2001', specialty: 'Bank-backed life and general cover' },
  { name: 'LOLC General', type: 'General', founded: '2008', specialty: 'Motor, property & SME insurance' },
  { name: 'Continental Insurance', type: 'General', founded: '2002', specialty: 'Motor, marine & non-life cover' },
  { name: 'Orient Insurance', type: 'General', founded: '2007', specialty: 'Motor, travel & general insurance' },
];

export default function InsuranceCompanies() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="companies" className="bg-gray-100 py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
          >
            The Market
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-chalk leading-none"
            style={{ fontSize: 'clamp(56px, 8vw, 120px)', letterSpacing: '0.02em' }}
          >
            INSURANCE<br />COMPANIES
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={headInView ? { width: '4rem' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px bg-ink mt-8"
          />
        </div>

        <div className="space-y-0">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 py-6 border-b border-gray-200 hover:bg-gray-100/50 px-0 hover:px-4 transition-all duration-300"
            >
              <div className="sm:w-1/4">
                <h3 className="font-heading text-2xl text-chalk">{company.name}</h3>
              </div>
              <div className="sm:w-1/4">
                <span className="inline-block font-body text-xs tracking-wider uppercase border border-gray-400 text-gray-600 px-3 py-1">
                  {company.type}
                </span>
              </div>
              <div className="sm:w-2/4 flex items-center justify-between">
                <p className="font-body text-sm text-gray-600">{company.specialty}</p>
                <div className="flex items-center gap-4 ml-6">
                  <span className="font-body text-xs text-gray-400">Est. {company.founded}</span>
                  <svg
                    className="text-gray-400 group-hover:text-chalk transition-colors opacity-0 group-hover:opacity-100"
                    width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-brand text-white"
        >
          <p className="font-body text-xs tracking-widest uppercase text-gray-400 mb-3">Coach&apos;s Note</p>
          <p className="font-heading italic text-lg md:text-xl leading-relaxed">
            Each insurer has different strengths. The right company depends on your specific needs —
            not the biggest brand, but the best fit for your risk profile.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
