import Link from 'next/link';
import VideoScroll from '@/components/VideoScroll';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import LogoMarquee from '@/components/ui/LogoMarquee';

const services = [
  { label: 'Health Insurance', desc: 'Hospitalisation, surgical and OPD cover for you and your family.' },
  { label: 'Motor Insurance', desc: 'Comprehensive and third-party cover for cars, vans and fleets.' },
  { label: 'Life Insurance', desc: 'Protect your family’s future with the right life cover.' },
  { label: 'Home & Contents', desc: 'Cover your house and belongings against fire, theft and perils.' },
  { label: 'Travel Insurance', desc: 'Medical, baggage and trip cover for travel anywhere.' },
  { label: 'Business Insurance', desc: 'Property, liability and asset protection for your business.' },
  { label: 'Income Protection', desc: 'Keep your income flowing if illness or injury stops work.' },
  { label: 'Global Medical', desc: 'International health cover for treatment beyond Sri Lanka.' },
  { label: 'Group Life', desc: 'Life cover for your employees as a valued staff benefit.' },
  { label: 'Personal Accident', desc: 'Lump-sum and medical cover for accidental injury.' },
  { label: 'Liability', desc: 'Public, product and professional liability protection.' },
  { label: 'SME & Micro', desc: 'Affordable, right-sized cover for small businesses.' },
];

const steps = [
  { n: '01', title: 'Get acquainted', desc: 'Discover comprehensive insurance solutions designed to safeguard your future.' },
  { n: '02', title: 'Understand your options', desc: 'Explore a wide range of insurance options tailored to fit your unique needs.' },
  { n: '03', title: 'Get sorted', desc: 'Streamline your insurance process with expert, independent guidance.' },
];

const stats = [
  { k: '15+', v: 'Insurer partners' },
  { k: '12', v: 'Lines of cover' },
  { k: '100%', v: 'Independent advice' },
  { k: '1', v: 'Broker on your side' },
];

const partners = [
  { src: '/partners/slic.jpg',        alt: 'Sri Lanka Insurance' },
  { src: '/partners/ceylinco.jpg',    alt: 'Ceylinco Life' },
  { src: '/partners/union.jpg',       alt: 'Union Assurance' },
  { src: '/partners/aia.jpg',         alt: 'AIA Insurance' },
  { src: '/partners/allianz.jpg',     alt: 'Allianz Lanka' },
  { src: '/partners/fairfirst.jpg',   alt: 'Fairfirst Insurance' },
  { src: '/partners/hnb.jpg',         alt: 'HNB Assurance' },
  { src: '/partners/softlogic.jpg',   alt: 'Softlogic Life' },
  { src: '/partners/lolc.jpg',        alt: 'LOLC Insurance' },
  { src: '/partners/continental.jpg', alt: 'Continental Insurance' },
  { src: '/partners/orient.jpg',      alt: 'Orient Insurance' },
  { src: '/partners/amana.jpg',       alt: 'Amana Takaful' },
  { src: '/partners/peoples.jpg',     alt: "People's Insurance" },
  { src: '/partners/mbsl.jpg',        alt: 'MBSL Insurance' },
  { src: '/partners/arpico.jpg',      alt: 'Arpico Insurance' },
];

export default function Home() {
  return (
    <main className="bg-ink">
      <VideoScroll />

      {/* ── About Ceilao ───────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <Reveal>
            <p className="font-body text-xs tracking-widest3 text-brand uppercase mb-5">Who we are</p>
            <h2 className="font-heading text-3xl md:text-5xl leading-tight text-chalk mb-6">
              Insurance without the headache — we do the shopping around for you.
            </h2>
            <p className="font-body text-base md:text-lg text-gray-400 leading-relaxed mb-5">
              Ceilao Insurance Brokers works for <span className="text-brand font-semibold">you</span>, not the
              insurer. Tell us once what you need — health, motor, life, travel or your business — and we compare
              Sri Lanka&apos;s leading insurers side by side, then hand you a clear answer instead of a sales pitch.
            </p>
            <p className="font-body text-base text-gray-500 leading-relaxed">
              And when it&apos;s claim time, you&apos;re not on hold with a call centre — you&apos;ve got a broker in your corner.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link href="/get-quote" className="btn-brand px-8 py-4">
                Get a Quote
              </Link>
              <Link href="/brokers" className="inline-flex items-center px-8 py-4 rounded-full border border-brand text-brand font-body text-xs font-semibold tracking-widest uppercase hover:bg-brand hover:text-white transition-colors">
                Why a broker?
              </Link>
            </div>
          </Reveal>

          {/* photo + stat grid */}
          <div className="flex flex-col gap-4">
            <Reveal y={20}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/handshake.jpg"
                alt="A Ceilao broker welcoming a client"
                className="w-full h-56 md:h-64 object-cover rounded-2xl border border-gray-800"
                loading="lazy"
                decoding="async"
                width={900}
                height={600}
              />
            </Reveal>
            <div className="grid grid-cols-2 gap-px bg-gray-800 border border-gray-800 rounded-2xl overflow-hidden">
              {stats.map((s, i) => (
                <Reveal key={s.v} delay={i * 0.08} y={16} className="bg-ink">
                  <div className="p-6 md:p-8 h-full">
                    <Counter value={s.k} className="font-display text-4xl md:text-5xl text-brand" />
                    <div className="font-body text-sm text-gray-500 mt-2">{s.v}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section className="py-24 md:py-28 bg-gray-100 border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="font-body text-xs tracking-widest3 text-brand uppercase mb-4">How it works</p>
            <h2 className="font-display text-chalk leading-none mb-14" style={{ fontSize: 'clamp(40px, 6vw, 84px)' }}>
              THREE SIMPLE STEPS
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-gray-800 border border-gray-800">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12} className="bg-gray-100">
                <div className="group p-9 h-full hover:bg-ink transition-colors duration-300">
                  <div className="font-display text-6xl text-brand-300 mb-4 transition-colors group-hover:text-brand">{s.n}</div>
                  <h3 className="font-heading text-2xl text-chalk mb-3">{s.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Reveal className="mb-14">
            <p className="font-body text-xs tracking-widest3 text-brand uppercase mb-4">What we cover</p>
            <h2 className="font-display text-chalk leading-none" style={{ fontSize: 'clamp(44px, 6vw, 92px)' }}>
              INSURANCE FOR<br />EVERY PART OF LIFE
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-800 border border-gray-800">
            {services.map((s, i) => (
              <Reveal key={s.label} delay={(i % 4) * 0.06} y={18} className="bg-ink">
                <Link
                  href="/get-quote"
                  className="group h-full p-8 flex flex-col gap-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <h3 className="font-heading text-chalk text-lg group-hover:text-brand-600 transition-colors">{s.label}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                  <div className="flex items-center gap-2 text-gray-600 group-hover:text-brand transition-all text-xs font-body tracking-widest uppercase group-hover:gap-3">
                    Get a quote
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8M6 2l4 4-4 4" /></svg>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners carousel ──────────────────────────────────────── */}
      <section className="py-20 bg-gray-100 border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="font-body text-xs tracking-widest3 text-brand uppercase mb-10 text-center">
              We place your cover with Sri Lanka’s leading insurers
            </p>
          </Reveal>
          <LogoMarquee logos={partners} />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-28">
        <Reveal className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="font-display text-chalk leading-none mb-6" style={{ fontSize: 'clamp(44px, 7vw, 104px)' }}>
            READY TO <span className="bg-brand-gradient bg-clip-text text-transparent">GET COVERED?</span>
          </h2>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Create an account, choose a product, and our brokers will do the rest — comparing the market and coming back with the right cover.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/get-quote" className="inline-flex items-center px-10 py-4 bg-brand-gradient text-white font-display text-base tracking-widest uppercase transition-transform hover:-translate-y-0.5">
              Get a Quote
            </Link>
            <a href="tel:+94773057892" className="inline-flex items-center px-8 py-4 border border-brand text-brand font-display text-base tracking-widest uppercase hover:bg-brand hover:text-white transition-colors">
              Call +94 77 305 7892
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
