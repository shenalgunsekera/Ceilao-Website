'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const posts = [
  {
    category: 'Life Insurance',
    date: 'May 2026',
    title: 'Why Term Life Insurance Beats Whole-of-Life for Most Sri Lankans',
    excerpt: 'Most people are oversold expensive life policies when a simple term plan would provide superior cover at a fraction of the cost. Here\'s the honest comparison.',
    readTime: '6 min read',
  },
  {
    category: 'Claims',
    date: 'Apr 2026',
    title: 'How to Prevent Your Insurance Claim from Being Rejected',
    excerpt: 'Claim repudiations often come down to technicalities. Understanding your obligations — from disclosure to notification — can mean the difference between payment and rejection.',
    readTime: '8 min read',
  },
  {
    category: 'Motor',
    date: 'Apr 2026',
    title: 'The Hidden Costs of Being Underinsured on Your Vehicle',
    excerpt: 'Many policyholders insure their car at an outdated value. When they claim, the shortfall shock hits hard. Here\'s how to ensure your cover matches reality.',
    readTime: '5 min read',
  },
  {
    category: 'Business',
    date: 'Mar 2026',
    title: 'Is Your Business Actually Covered? The SME Insurance Blind Spots',
    excerpt: 'Small businesses often discover their gaps in cover only when they need to claim. Cyber risk, public liability, and business interruption are the most commonly missed.',
    readTime: '10 min read',
  },
  {
    category: 'Careers',
    date: 'Mar 2026',
    title: 'Starting a Career in Insurance: The Honest Guide for 2026',
    excerpt: 'The insurance industry offers exceptional income potential and job stability — but the path requires the right qualifications and realistic expectations. We map it out.',
    readTime: '7 min read',
  },
  {
    category: 'Regulation',
    date: 'Feb 2026',
    title: 'IRCSL Conduct Standard: What the New Rules Mean for Policyholders',
    excerpt: 'The new IRCSL conduct standard fundamentally changes how insurers must treat you. Here\'s what you\'re now entitled to — and how to enforce it.',
    readTime: '9 min read',
  },
];

export default function Blogs() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="blogs" className="bg-gray-100 py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headInView ? { opacity: 1 } : {}}
              className="font-body text-xs tracking-widest3 text-gray-500 uppercase mb-4"
            >
              Knowledge Hub
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-chalk leading-none"
              style={{ fontSize: 'clamp(56px, 8vw, 120px)', letterSpacing: '0.02em' }}
            >
              INSIGHTS &<br />BLOGS
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="self-start md:self-end flex items-center gap-3 font-body text-xs tracking-widest uppercase text-chalk border border-brand px-6 py-3 hover:bg-ink hover:text-chalk transition-all duration-300 mb-4"
          >
            View All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group bg-gray-100 p-8 hover:bg-ink transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-body text-xs tracking-wider uppercase border border-gray-300 group-hover:border-gray-700 text-gray-500 group-hover:text-gray-400 px-3 py-1 transition-colors duration-300">
                  {post.category}
                </span>
                <span className="font-body text-xs text-gray-400">{post.date}</span>
              </div>
              <h3 className="font-heading text-lg text-chalk group-hover:text-chalk mb-4 leading-snug transition-colors duration-300">
                {post.title}
              </h3>
              <p className="font-body text-sm text-gray-600 group-hover:text-gray-400 leading-relaxed mb-6 transition-colors duration-300">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-gray-400">{post.readTime}</span>
                <svg
                  className="text-gray-400 group-hover:text-chalk transition-colors duration-300"
                  width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
