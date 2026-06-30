'use client';

/**
 * Single-screen hero. Static image (drop your banner at public/hero-banner.jpg),
 * centered title, then the page scrolls normally to the next section.
 */
export default function VideoScroll() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#160a03]">
      {/* Hero image — drop your banner at: public/hero-banner.jpg */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-banner.jpg"
        alt="Ceilao Insurance Brokers"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.04)', transformOrigin: 'center center' }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* Warm scrim — keeps white text readable and fades into the white page below. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A1206]/55 via-[#2A1206]/20 to-white pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A1206]/30 via-transparent to-[#2A1206]/30 pointer-events-none z-10" />

      {/* Centered title */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center animate-fade-in">
        <p className="font-body text-xs tracking-widest3 text-white/70 uppercase mb-6">Welcome to</p>
        <h1
          className="font-display text-white leading-none"
          style={{ fontSize: 'clamp(60px, 10vw, 140px)', letterSpacing: '0.04em' }}
        >
          <span className="bg-brand-gradient bg-clip-text text-transparent">CEILAO</span><br />INSURANCE BROKERS
        </h1>
        <div className="mt-8 w-16 h-px bg-brand" />
        <p className="mt-6 font-heading italic text-white/80 text-lg md:text-xl">
          Independent insurance advice for Sri Lanka
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="font-body text-xs tracking-widest2 text-white/60 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
