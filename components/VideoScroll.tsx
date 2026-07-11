import Link from 'next/link';

/**
 * Home hero — the branded Ceilao visual fills EXACTLY the viewport below the
 * fixed 64px header (no more, no less). The image's key artwork sits on the
 * right, so the copy sits left over the darker map area with a scrim for
 * guaranteed readability.
 */
export default function VideoScroll() {
  return (
    <section className="relative mt-16 h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden bg-[#1A0C05]">
      {/* Top fill continuing the artwork's tones — the picture itself sits
          lower, full-width, without zoom-stretching (which caused the blur) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#31150A] via-[#1A0C05] to-black" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-banner.jpg"
        alt="Ceilao Insurance Brokers — get quotes, compare insurers, manage policies and claims in one place"
        className="absolute inset-x-0 bottom-0 w-full h-[86%] object-cover object-[72%_30%]"
        fetchPriority="high"
        decoding="async"
      />
      {/* Blend the picture's top edge into the fill */}
      <div className="absolute inset-x-0 top-[8%] h-[14%] bg-gradient-to-b from-[#1A0C05] to-transparent" />

      {/* Readability scrim over the text side only */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Copy — vertically centered, left */}
      <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          <p className="font-body text-[11px] md:text-xs tracking-widest3 text-brand-light uppercase mb-4 animate-fade-in">
            Independent insurance brokers · Sri Lanka
          </p>
          <h1
            className="font-display text-white leading-[0.95] animate-fade-up drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]"
            style={{ fontSize: 'clamp(42px, 6.5vw, 96px)', letterSpacing: '0.02em' }}
          >
            INSURANCE THAT<br />
            <span className="text-brand-light">ACTUALLY HAS YOUR BACK</span>
          </h1>
          <p className="mt-5 font-body text-white/90 text-base md:text-lg max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
            Get quotes, compare every leading insurer, buy and manage your policy — with real
            humans on your side at claim time. We work for you, not the insurance company.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/get-quote" className="btn-brand px-8 py-3.5">Get my free quote</Link>
            <Link
              href="/brokers"
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/50 bg-black/20 text-white font-body text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-chalk transition-colors"
            >
              Why use a broker?
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5">
        <span className="font-body text-[10px] tracking-widest2 text-white/60 uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
