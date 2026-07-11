import Link from 'next/link';

/**
 * Home hero: a real photo (public/hero-banner.jpg) under a dark scrim so the
 * headline is always crisp. Static markup — no client JS — so it paints
 * instantly and scrolls smoothly on mobile.
 */
export default function VideoScroll() {
  return (
    <section className="relative h-[92vh] min-h-[560px] overflow-hidden bg-[#1B1E24]">
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-banner.jpg"
        alt="A family enjoying an evening walk — protected by the right insurance"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      {/* Scrim — darker at the bottom-left where the text sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

      {/* Copy */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <p className="font-body text-[11px] md:text-xs tracking-widest3 text-brand-light uppercase mb-4 animate-fade-in">
            Independent insurance brokers · Sri Lanka
          </p>
          <h1
            className="font-display text-white leading-[0.95] animate-fade-up"
            style={{ fontSize: 'clamp(44px, 8vw, 110px)', letterSpacing: '0.02em' }}
          >
            INSURANCE THAT<br />
            <span className="bg-brand-gradient bg-clip-text text-transparent">ACTUALLY HAS YOUR BACK</span>
          </h1>
          <p className="mt-5 font-body text-white/85 text-base md:text-lg max-w-xl">
            One request, every leading insurer compared, zero pressure. We work for you — not the insurance company.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/get-quote" className="btn-brand px-8 py-3.5">Get my free quote</Link>
            <Link
              href="/brokers"
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/40 text-white font-body text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-chalk transition-colors"
            >
              Why use a broker?
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 right-6 md:right-12 hidden sm:flex flex-col items-center gap-2">
        <span className="font-body text-[10px] tracking-widest2 text-white/60 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
