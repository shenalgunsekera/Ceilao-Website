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
          <div key={i} className="shrink-0 mx-7 md:mx-10 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-16 md:h-24 w-auto object-contain rounded-lg"
              loading="lazy"
              decoding="async"
              width={220}
              height={96}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
