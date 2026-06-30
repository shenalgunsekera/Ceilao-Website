'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const products = [
  { name: 'Property Loss', code: 'PL', desc: 'Covers loss or damage to buildings and contents — residential or commercial. Protects against fire, storm, theft, and accidental damage.' },
  { name: 'Fire Risk Cover', code: 'FR', desc: 'Specialised fire insurance for assets at high risk. Covers reinstatement costs, debris removal, and business interruption following a fire event.' },
  { name: 'Motor Fleet', code: 'MF', desc: 'Single policy covering multiple vehicles. Ideal for businesses with a fleet — comprehensive or third-party cover for cars, vans, and trucks.' },
  { name: 'Equipment Breakdown', code: 'EB', desc: 'Covers sudden and unforeseen mechanical or electrical breakdown of machinery. Includes repair, replacement, and loss of profit during downtime.' },
  { name: 'Marine Cargo', code: 'MC', desc: 'Protects goods in transit — sea, air, or road. Covers loss, damage, or theft of cargo between origin and destination worldwide.' },
  { name: 'Product Liability', code: 'PRD', desc: 'Covers your legal liability if a product you manufactured, supplied, or sold causes bodily injury or property damage to a third party.' },
  { name: 'Cyber Risk', code: 'CR', desc: 'Covers financial loss from cyber attacks, data breaches, ransomware, and digital fraud. Includes forensic investigation and notification costs.' },
  { name: 'Supply Chain Interruption', code: 'SCI', desc: 'Covers revenue loss when your supply chain is disrupted. Triggered by supplier failure, natural disaster, or geopolitical events.' },
];

export default function GeneralInsurance() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="general-insurance" className="bg-gray-100 py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
          >
            Short-term Insurance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-chalk leading-none"
            style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '0.02em' }}
          >
            GENERAL INSURANCE<br />PRODUCTS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-lg font-body text-gray-500 text-sm leading-relaxed"
          >
            Commercial and personal lines coverage — the foundation of every risk management strategy for businesses and individuals alike.
          </motion.p>
        </div>

        {/* Briefcase-inspired grid */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-300">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ backgroundColor: '#0a0a0a', color: '#fafafa', transition: { duration: 0.2 } }}
                className="group bg-gray-100 p-6 md:p-8 flex flex-col gap-4 cursor-default"
              >
                <span className="font-display text-3xl text-gray-400 group-hover:text-gray-500 transition-colors duration-200 leading-none">{product.code}</span>
                <h3 className="font-heading text-base md:text-lg text-chalk group-hover:text-chalk transition-colors duration-200">
                  {product.name}
                </h3>
                <p className="font-body text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-200">
                  {product.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col md:flex-row gap-6 items-start md:items-center"
        >
          <div className="flex-1 p-8 bg-brand text-white">
            <p className="font-body text-xs tracking-widest uppercase text-gray-500 mb-4">Business Risk Assessment</p>
            <p className="font-heading italic text-xl md:text-2xl text-chalk leading-relaxed">
              No two businesses face the same risks. A proper insurance review identifies exactly what you&apos;re exposed to — and what you need covered.
            </p>
          </div>
          <div className="md:w-64 p-8 border border-gray-300">
            <p className="font-body text-xs tracking-widest uppercase text-gray-500 mb-4">Did you know?</p>
            <p className="font-display text-5xl text-chalk mb-2">60%</p>
            <p className="font-body text-sm text-gray-600">
              of small businesses close within 6 months of a major uninsured loss.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
