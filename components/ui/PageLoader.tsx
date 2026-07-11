'use client';

import { useEffect, useState } from 'react';
import Loader from './Loader';

/**
 * Brief branded overlay on FIRST visit only.
 * Perf notes:
 *  • It never waits for window.load (which blocks on every image/font and made
 *    the site feel seconds-slow) — it fades as soon as the DOM is interactive,
 *    with a 900 ms hard cap.
 *  • Repeat navigations in the same session skip it entirely.
 *  • Once faded it unmounts, so no invisible full-screen layer sits over the
 *    page eating compositing time while you scroll.
 */
export default function PageLoader() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    try { return sessionStorage.getItem('cib_seen') === '1'; } catch { return false; }
  });
  const [gone, setGone] = useState(done);

  useEffect(() => {
    if (done) return;
    try { sessionStorage.setItem('cib_seen', '1'); } catch { /* ignore */ }

    const finish = () => setDone(true);
    // Fade when the DOM is ready — never wait for images/fonts.
    if (document.readyState !== 'loading') {
      const t = setTimeout(finish, 250);
      return () => clearTimeout(t);
    }
    document.addEventListener('DOMContentLoaded', finish, { once: true });
    const cap = setTimeout(finish, 900); // hard cap
    return () => {
      document.removeEventListener('DOMContentLoaded', finish);
      clearTimeout(cap);
    };
  }, [done]);

  // Unmount after the fade so nothing overlays the page afterwards.
  useEffect(() => {
    if (!done || gone) return;
    const t = setTimeout(() => setGone(true), 450);
    return () => clearTimeout(t);
  }, [done, gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[200] transition-opacity duration-500 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <Loader />
    </div>
  );
}
