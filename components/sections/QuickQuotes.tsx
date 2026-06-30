'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const insuranceTypes = ['Life Insurance', 'Motor Insurance', 'Home Contents', 'Business Cover', 'Medical Aid', 'Disability Cover', 'Funeral Cover', 'Business Liability'];

export default function QuickQuotes() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  const toggle = (type: string) => {
    setSelected((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="quotes" className="bg-ink py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
          >
            No Obligation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-chalk leading-none"
            style={{ fontSize: 'clamp(56px, 8vw, 120px)', letterSpacing: '0.02em' }}
          >
            QUICK<br />QUOTES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 font-body text-gray-400 text-sm max-w-md mx-auto"
          >
            Tell us what you need. We&apos;ll connect you with qualified brokers who can find the best cover at the best price.
          </motion.p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center py-20"
          >
            <div className="w-16 h-16 border border-chalk mx-auto mb-8 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-chalk">
                <path d="M5 14l6 6L23 8" />
              </svg>
            </div>
            <h3 className="font-display text-3xl text-chalk tracking-wide mb-4">REQUEST RECEIVED</h3>
            <p className="font-body text-gray-400">
              A qualified broker will contact you within one business day to discuss your options.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-8">
              <p className="font-body text-xs tracking-widest uppercase text-gray-500 mb-4">Select what you need covered</p>
              <div className="flex flex-wrap gap-3">
                {insuranceTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggle(type)}
                    className={`px-4 py-2 font-body text-xs tracking-wide border transition-all duration-200 ${
                      selected.includes(type)
                        ? 'bg-brand text-white border-chalk'
                        : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-chalk'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-gray-500 mb-2">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-gray-900 border border-gray-800 text-chalk px-4 py-3 font-body text-sm placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-gray-500 mb-2">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+27 "
                  className="w-full bg-gray-900 border border-gray-800 text-chalk px-4 py-3 font-body text-sm placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-body text-xs tracking-widest uppercase text-gray-500 mb-2">Email Address</label>
              <input
                required
                type="email"
                placeholder="your@email.com"
                className="w-full bg-gray-900 border border-gray-800 text-chalk px-4 py-3 font-body text-sm placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>

            <div className="mb-8">
              <label className="block font-body text-xs tracking-widest uppercase text-gray-500 mb-2">Additional Notes (optional)</label>
              <textarea
                rows={3}
                placeholder="Any specific requirements or questions..."
                className="w-full bg-gray-900 border border-gray-800 text-chalk px-4 py-3 font-body text-sm placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand text-white font-display text-xl tracking-widest hover:bg-gray-100 transition-colors duration-300"
            >
              REQUEST QUOTES — FREE
            </button>
            <p className="mt-4 text-center font-body text-xs text-gray-600">
              No spam. No cold calls. A qualified broker will reach out within 24 hours.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
