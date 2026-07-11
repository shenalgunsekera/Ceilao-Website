'use client';

import { useEffect, useState } from 'react';
import Loader from './Loader';

/**
 * Brief branded overlay on first visit.
 *
 * Hydration-safe: the server and the client's first render are IDENTICAL
 * (overlay visible) — all decisions happen inside useEffect, after hydration.
 * Reading sessionStorage in the state initializer caused a server/client
 * mismatch that left the overlay stuck on refresh.
 *
 * Perf: never waits for window.load; fades on DOM-ready with a 900 ms hard
 * cap, skips instantly on repeat visits in the same session, and fully
 * unmounts after fading so nothing overlays the page while scrolling.
 */
export default function PageLoader() {
  const [phase, setPhase] = useState<'show' | 'fade' | 'gone'>('show');

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let goneTimer: ReturnType<typeof setTimeout> | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase('fade');
      goneTimer = setTimeout(() => setPhase('gone'), 450);
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem('cib_seen') === '1';
      sessionStorage.setItem('cib_seen', '1');
    } catch { /* ignore */ }

    if (seen) {
      finish(); // repeat visit — dismiss immediately
    } else if (document.readyState !== 'loading') {
      fadeTimer = setTimeout(finish, 250);
    } else {
      document.addEventListener('DOMContentLoaded', finish, { once: true });
      fadeTimer = setTimeout(finish, 900); // hard cap — can never get stuck
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
      document.removeEventListener('DOMContentLoaded', finish);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden={phase !== 'show'}
      className={`fixed inset-0 z-[200] transition-opacity duration-500 ${
        phase === 'show' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <Loader />
    </div>
  );
}
