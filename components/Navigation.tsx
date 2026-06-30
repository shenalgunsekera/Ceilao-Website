'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthProvider';
import { logout } from '@/lib/customerAuth';

const navItems = [
  { href: '/about', label: 'About Us' },
  { href: '/learn', label: 'Learn Insurance' },
  { href: '/brokers', label: 'Insurance Brokers' },
  { href: '/life-insurance', label: 'Life Insurance' },
  { href: '/general-insurance', label: 'General Insurance' },
  { href: '/companies', label: 'Insurance Companies' },
  { href: '/regulator', label: 'Regulator (IRCSL)' },
  { href: '/ombudsman', label: 'Insurance Ombudsman' },
  { href: '/blogs', label: 'Insights' },
];

function Wordmark() {
  return (
    <span className="flex items-center select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/ceilao-logo.png" alt="Ceilao Insurance Brokers" className="h-12 w-auto" />
    </span>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const doLogout = async () => {
    await logout();
    router.push('/');
  };

  const firstName = (profile?.full_name || user?.displayName || '').split(' ')[0];

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-ink/95 backdrop-blur-sm border-b border-gray-800 ${
          scrolled ? 'shadow-[0_8px_30px_-12px_rgba(255,106,26,0.25)]' : ''
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Wordmark />
          </Link>

          <div className="flex items-center gap-3">
            {!loading && (
              user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-chalk text-xs tracking-widest uppercase hover:text-brand-light transition-colors duration-300"
                  >
                    {firstName ? `Hi, ${firstName}` : 'Dashboard'}
                  </Link>
                  <button
                    onClick={doLogout}
                    className="hidden md:flex items-center px-3 py-2 text-gray-400 text-xs tracking-widest uppercase hover:text-chalk transition-colors"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex items-center px-4 py-2 text-chalk text-xs tracking-widest uppercase hover:text-brand-light transition-colors duration-300"
                >
                  Login
                </Link>
              )
            )}
            <Link
              href="/get-quote"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-brand-gradient text-white text-xs tracking-widest uppercase font-semibold hover:brightness-110 transition-all duration-300"
            >
              Get a Quote
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-1.5 p-2 group"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-px bg-chalk transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-px bg-chalk transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-6 h-px bg-chalk transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 z-50 flex flex-col"
            >
              <div className="p-8 border-b border-gray-800 flex items-center justify-between">
                <span className="font-display text-chalk text-xl tracking-wider">NAVIGATE</span>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-chalk transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className={`w-full text-left px-8 py-4 border-b border-gray-800/50 flex items-center justify-between transition-colors duration-200 ${
                        pathname === item.href
                          ? 'text-chalk bg-gray-800'
                          : 'text-gray-400 hover:text-chalk hover:bg-gray-800/50'
                      }`}
                    >
                      <span className="font-body text-sm tracking-wide">{item.label}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                <div className="px-8 py-5 mt-2 border-t border-gray-800/60 flex flex-col gap-2">
                  {user ? (
                    <>
                      <Link href="/dashboard" className="text-brand-light font-body text-sm tracking-wide">My Dashboard</Link>
                      <button onClick={doLogout} className="text-left text-gray-400 font-body text-sm tracking-wide hover:text-chalk">Log out</button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="text-chalk font-body text-sm tracking-wide">Login</Link>
                      <Link href="/signup" className="text-brand-light font-body text-sm tracking-wide">Create an account</Link>
                    </>
                  )}
                </div>
              </nav>

              <div className="p-8 border-t border-gray-800">
                <Link
                  href="/get-quote"
                  className="block w-full py-3 bg-brand-gradient text-white font-display text-lg tracking-widest text-center hover:brightness-110 transition-all"
                >
                  GET A FREE QUOTE
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
