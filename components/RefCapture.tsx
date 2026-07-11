'use client';

// Captures ?ref=MKT001 from any landing URL into localStorage so a quote
// submitted later (within the 60-day window) is attributed to that marketer.
// Renders nothing.

import { useEffect } from 'react';
import { saveAffiliateRef } from '@/lib/marketerAuth';

export default function RefCapture() {
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get('ref');
      if (ref) saveAffiliateRef(ref);
    } catch { /* ignore */ }
  }, []);
  return null;
}
