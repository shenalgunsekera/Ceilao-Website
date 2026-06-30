'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animated number counter. Accepts values like "15+", "100%", "12", "1".
 * Counts up from 0 to the numeric part once, when scrolled into view.
 */
export default function Counter({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  const prefix = match?.[1] ?? '';
  const numStr = match?.[2] ?? '';
  const suffix = match?.[3] ?? '';
  const target = numStr ? parseFloat(numStr) : 0;
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current || !numStr) return;
    done.current = true;
    let raf = 0;
    const dur = 1500;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!numStr) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
