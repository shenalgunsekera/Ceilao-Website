'use client';

/** Clean infinite text carousel — seamless loop, fades at both edges, pauses on hover. */
export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]; // duplicated for a seamless -50% loop
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-heading text-xl md:text-2xl text-gray-400 px-8 whitespace-nowrap">{item}</span>
            <span className="text-brand/40 text-lg">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
