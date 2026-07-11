'use client';

/**
 * Infinite partner-logo carousel — seamless CSS loop, pauses on hover.
 * Pure CSS animation (GPU transform) so it never janks the main thread.
 */
export type PartnerLogo = { src: string; alt: string };

export default function LogoMarquee({ logos }: { logos: PartnerLogo[] }) {
  const row = [...logos, ...logos]; // duplicated for a seamless -50% loop
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused]">
        {row.map((logo, i) => (
          <div
            key={i}
            className="shrink-0 mx-5 md:mx-8 flex items-center justify-center bg-white rounded-xl border border-gray-800 px-6 py-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 md:h-14 w-auto object-contain"
              loading="lazy"
              decoding="async"
              width={160}
              height={56}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
