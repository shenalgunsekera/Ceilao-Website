'use client';

/**
 * Single-screen hero. A warm brand background with floating insurance line-icons
 * around the edges (relatable, but kept clear of the centered wordmark). If you
 * drop a photo at public/hero-banner.jpg it will layer on top; otherwise the
 * decorative background shows.
 */

// Insurance-related line icons, scattered around the edges (never the centre).
const ICONS: { d: React.ReactNode; pos: string; size: number; delay: string }[] = [
  { // umbrella (protection)
    d: <><path d="M12 3v2" /><path d="M3 12a9 9 0 0 1 18 0Z" /><path d="M12 12v6a2 2 0 0 0 4 0" /></>,
    pos: 'top-[16%] left-[8%]', size: 92, delay: '0s',
  },
  { // shield
    d: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />,
    pos: 'top-[12%] right-[10%]', size: 88, delay: '1.2s',
  },
  { // home
    d: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>,
    pos: 'top-[54%] left-[5%]', size: 78, delay: '2.1s',
  },
  { // heart (health)
    d: <path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9z" />,
    pos: 'top-[50%] right-[7%]', size: 84, delay: '0.6s',
  },
  { // car (motor)
    d: <><path d="M3 13l2-5h14l2 5" /><path d="M3 13h18v4H3z" /><circle cx="7" cy="17" r="1.6" /><circle cx="17" cy="17" r="1.6" /></>,
    pos: 'bottom-[14%] left-[14%]', size: 96, delay: '1.8s',
  },
  { // plane (travel)
    d: <path d="M10 3l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />,
    pos: 'bottom-[16%] right-[13%]', size: 74, delay: '2.6s',
  },
  { // briefcase (business)
    d: <><path d="M4 8h16v11H4z" /><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></>,
    pos: 'top-[30%] left-[24%]', size: 60, delay: '3.1s',
  },
  { // family / people
    d: <><circle cx="8" cy="8" r="2.4" /><circle cx="16" cy="8" r="2.4" /><path d="M4 19c0-2.8 1.8-4.5 4-4.5s4 1.7 4 4.5" /><path d="M12 19c0-2.8 1.8-4.5 4-4.5s4 1.7 4 4.5" /></>,
    pos: 'top-[26%] right-[24%]', size: 62, delay: '0.9s',
  },
];

export default function VideoScroll() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#160a03]">
      {/* Warm brand gradient base */}
      <div className="absolute inset-0 bg-brand-gradient opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#160a03]/70 via-[#2A1206]/30 to-white" />

      {/* Floating insurance icons — edges only, low opacity */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {ICONS.map((ic, i) => (
          <svg
            key={i}
            className={`absolute ${ic.pos} text-white/[0.12] animate-floaty`}
            style={{ width: ic.size, height: ic.size, animationDelay: ic.delay }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
          >
            {ic.d}
          </svg>
        ))}
      </div>

      {/* Optional real photo on top (shows only if the file exists) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-banner.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-10"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* Centre spotlight so the words are always crisp and legible */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(60% 50% at 50% 45%, rgba(22,10,3,0.55), transparent 70%)' }}
      />

      {/* Centered title */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center animate-fade-in">
        <p className="font-body text-xs tracking-widest3 text-white/70 uppercase mb-6">Welcome to</p>
        <h1
          className="font-display text-white leading-none drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
          style={{ fontSize: 'clamp(60px, 10vw, 140px)', letterSpacing: '0.04em' }}
        >
          <span className="bg-brand-gradient bg-clip-text text-transparent">CEILAO</span><br />INSURANCE BROKERS
        </h1>
        <div className="mt-8 w-16 h-px bg-brand" />
        <p className="mt-6 font-heading italic text-white/85 text-lg md:text-xl">
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
