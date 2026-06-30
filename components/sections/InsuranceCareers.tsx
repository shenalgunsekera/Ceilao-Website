'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const roles = [
  { title: 'Insurance Broker', level: 'Entry → Senior', salary: 'LKR 600k – 3M', desc: 'Advise clients, source cover from multiple insurers, manage portfolios and claims.' },
  { title: 'Underwriter', level: 'Junior → Chief', salary: 'R240k – R1.2m', desc: 'Evaluate and price risk for new and renewal policies across all lines of business.' },
  { title: 'Claims Assessor', level: 'Entry → Manager', salary: 'R200k – R700k', desc: 'Investigate, validate, and settle insurance claims within policy terms and conditions.' },
  { title: 'Actuary', level: 'Graduate → Fellow', salary: 'R500k – R2.5m', desc: 'Model risk, price products, and manage reserving using advanced mathematics and statistics.' },
  { title: 'Risk Manager', level: 'Specialist → Director', salary: 'R400k – R1.8m', desc: 'Identify, assess, and mitigate enterprise-wide risks for corporations and insurers.' },
  { title: 'Financial Advisor (FSP)', level: 'Tied → IFA', salary: 'R150k – R1.5m', desc: 'Provide regulated financial and insurance advice directly to individuals and businesses.' },
];

const pathways = [
  { step: '1', label: 'Get Qualified', detail: 'NQF 4 (RE5) for advisors / relevant degree for underwriting & actuarial' },
  { step: '2', label: 'Regulatory Compliance', detail: 'Register with the IRCSL, complete licensing requirements and CPD hours annually' },
  { step: '3', label: 'Work Experience', detail: 'Minimum 1 year supervised experience before operating independently' },
  { step: '4', label: 'Specialise & Grow', detail: 'Choose your niche: life, short-term, medical aid, commercial or actuarial science' },
];

export default function InsuranceCareers() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="careers" className="bg-ink py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
          >
            Professional Opportunities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-chalk leading-none"
            style={{ fontSize: 'clamp(56px, 8vw, 120px)', letterSpacing: '0.02em' }}
          >
            INSURANCE<br />CAREERS
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="border border-gray-800 p-8 hover:border-gray-600 hover:bg-gray-900/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-body text-xs tracking-wider text-gray-500 uppercase border border-gray-700 px-3 py-1">
                  {role.level}
                </span>
              </div>
              <h3 className="font-heading text-xl text-chalk mb-3 group-hover:text-brand-600 transition-colors">
                {role.title}
              </h3>
              <p className="font-body text-sm text-gray-400 leading-relaxed mb-6">{role.desc}</p>
              <div className="border-t border-gray-800 pt-4">
                <p className="font-body text-xs text-gray-600 uppercase tracking-wider mb-1">Salary Range (p.a.)</p>
                <p className="font-display text-2xl text-chalk tracking-wide">{role.salary}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 p-10 md:p-16"
        >
          <p className="font-body text-xs tracking-widest uppercase text-gray-500 mb-10">Your Career Pathway</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {pathways.map((p, i) => (
              <div key={p.step} className="flex flex-col md:flex-row items-start">
                <div className="flex-1 pr-0 md:pr-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-display text-5xl text-gray-700">{p.step}</span>
                  </div>
                  <h4 className="font-heading text-lg text-chalk mb-2">{p.label}</h4>
                  <p className="font-body text-sm text-gray-400 leading-relaxed">{p.detail}</p>
                </div>
                {i < pathways.length - 1 && (
                  <div className="hidden md:flex items-center self-start mt-12 pr-6">
                    <div className="w-px h-12 bg-gray-700 rotate-90 md:rotate-0 md:w-12 md:h-px" />
                    <svg className="text-gray-600" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 6h8M6 2l4 4-4 4" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
