'use client';

import { useEffect, useState } from 'react';
import Loader from './Loader';

/**
 * Full-page loading overlay on first load. Stays visible until the browser
 * fires `window.load` — i.e. ALL resources (images, fonts, stylesheets) are
 * fully loaded — then fades out. Rendered from the first paint (initial state
 * is "loading") so there is no flash of unstyled / half-loaded content.
 * A safety timeout guarantees it never gets stuck.
 */
export default function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      // small settle delay so the fade feels intentional
      timer = setTimeout(() => setDone(true), 350);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    // Safety net — never block the page for more than 10s.
    const safety = setTimeout(() => setDone(true), 10000);

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(timer);
      clearTimeout(safety);
    };
  }, []);

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
