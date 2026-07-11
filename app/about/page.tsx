import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

export const metadata = { title: 'About Us | Ceilao Insurance Brokers' };

const team = [
  {
    name: 'Dr. Manjula Kulathunge',
    role: 'Director',
    photo: '/team/manjula-kulathunge.webp',
    bio: 'Dr. Kulathunge brings extensive expertise across migration law, telecommunications, stock markets and investment advisory since beginning his career in 1994. In 2001 he completed his MBA in Australia, gaining valuable international insight. Over the years he has spearheaded multiple enterprises, creating employment for over 850 individuals while driving economic growth in Sri Lanka and Australia — with strong business relationships across Australia, Dubai, Qatar, Singapore, Malaysia and Sri Lanka.',
  },
  {
    name: 'Shehan Gunasekera',
    role: 'Consultant',
    photo: '',
    bio: 'With over 25 years of experience in Sri Lanka’s insurance sector, Mr. Gunasekera is recognised for his leadership and integrity. He has held senior positions at leading insurers, including Senior Vice President of Sales & Distribution at Orient Insurance and Assistant General Manager of Corporate Business at AIA Insurance Lanka, driving strategic initiatives and earning industry recognition.',
  },
  {
    name: 'Dhammika Gunasena',
    role: 'Principal Officer',
    photo: '/team/dhammika-gunasena.jpg',
    bio: 'Mr. Gunasena has over 19 years of experience in the insurance industry and serves as Ceilao’s Principal Officer. His career includes leadership roles at Orient Insurance, Insureme Insurance Broker, HNB Assurance, AIA Insurance and Janashakthi Insurance. With strong expertise in sales, operations, bancassurance, underwriting and business development, he holds both a Diploma and Higher Diploma in Insurance from Wayamba University.',
  },
  {
    name: 'Saman Jayasena',
    role: 'Head of Sales & Operations',
    photo: '/team/saman-jayasena.jpg',
    bio: 'Mr. Jayasena has international experience, having worked in Dubai as a Financial Planner specialising in offshore investments and life insurance, achieving MDRT qualification for four years. He has held senior roles in Sri Lanka including Assistant Vice President at Orient Insurance, CEO of P&A Insurance Brokers and Head of Sales at Aseki Insurance Brokers. He also holds CII (UK) qualifications and Australian credentials in Marketing & Sales.',
  },
];

const group = [
  { name: 'Australian Migration Consultants', desc: 'Established in 2008, offering Skilled, Business, Investor, Student, Visitor and Family visa services. The first registered migration agent in Doha, now with offices in Sri Lanka, Australia and Dubai.' },
  { name: 'Ceilao Logistics Group', desc: 'A leading logistics provider in Sri Lanka, distributing globally recognised brands like Unilever, Fonterra, Upfield and Ekaterra to over 2,900 outlets nationwide — with an exclusive partnership for the Unilever online store (ustore.lk).' },
  { name: 'Australian Talent Network', desc: 'Senior management and executive talent acquisition — including retail, marketing and technical roles — serving multinationals such as Unilever, Fonterra and Upfield in Sri Lanka.' },
  { name: 'Eco-Coco | Eco Absorbent', desc: 'A Sri Lankan manufacturer of “Eco Absorbent” spill-absorbent materials and 100% natural coco peat, coco husk chips and geotextile products — premium hydroponic growth media made with modern techniques and rigorous quality control.' },
  { name: 'Ceilao Ezy', desc: 'Effortless, secure money transfers between Australia and Sri Lanka — simplifying financial transactions while promoting bilateral trade and economic growth.' },
];

function initials(name: string) {
  return name.replace(/^(Dr\.|Mr\.|Ms\.)\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('');
}

export default function AboutPage() {
  return (
    <main className="bg-ink pt-16">
      {/* Header — photo banner */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-[#1B1E24]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/skyline.jpg"
          alt="City skyline at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/30" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-5">About Ceilao</p>
            <h1 className="font-display text-white leading-none" style={{ fontSize: 'clamp(48px, 8vw, 116px)' }}>
              YOUR TRUSTED<br /><span className="bg-brand-gradient bg-clip-text text-transparent">INSURANCE PARTNER.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Welcome / intro */}
      <section className="py-24 md:py-32 border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1.2fr] gap-16">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl leading-tight text-chalk">
              Welcome to Ceilao Insurance Brokers — tailored insurance solutions, safeguarding tomorrow.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="font-body text-base md:text-lg text-gray-400 leading-relaxed space-y-5">
              <p>
                Ceilao Insurance Brokers (Pvt) Ltd is the newest addition to our esteemed group of companies. Based in Sri Lanka,
                our mission is to provide tailored insurance solutions to meet your unique needs.
              </p>
              <p>
                Leveraging the expertise and resources of our established group, we are committed to delivering comprehensive
                coverage options with exceptional service. Our experienced team guides you through every step of the insurance
                process with integrity and personalised care.
              </p>
              <p>
                We are <span className="text-brand font-semibold">licensed to provide brokering services for both life and general
                insurance</span> from all insurance providers — helping you achieve peace of mind through reliable, innovative cover.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-gray-100 border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="font-body text-xs tracking-widest3 text-brand uppercase mb-4">Leadership</p>
            <h2 className="font-display text-chalk leading-none mb-14" style={{ fontSize: 'clamp(40px, 6vw, 84px)' }}>
              THE TEAM BEHIND CEILAO
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-gray-800 border border-gray-800">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 2) * 0.1} className="bg-gray-100">
                <div className="p-8 md:p-10 h-full">
                  <div className="flex items-center gap-4 mb-5">
                    {m.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="h-16 w-16 rounded-full object-cover border-2 border-brand/30 shrink-0"
                        loading="lazy"
                        decoding="async"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-brand-gradient text-white flex items-center justify-center font-display text-xl shrink-0">
                        {initials(m.name)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading text-xl text-chalk leading-tight">{m.name}</h3>
                      <p className="font-body text-xs tracking-widest uppercase text-brand mt-1">{m.role}</p>
                    </div>
                  </div>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About our group */}
      <section className="py-24 border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="font-body text-xs tracking-widest3 text-brand uppercase mb-4">Our group</p>
            <h2 className="font-display text-chalk leading-none mb-4" style={{ fontSize: 'clamp(40px, 6vw, 84px)' }}>
              PART OF SOMETHING BIGGER
            </h2>
            <p className="font-body text-base text-gray-500 max-w-2xl mb-14">
              Ceilao Insurance Brokers is backed by a diversified group spanning migration, logistics, talent, manufacturing and finance.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800 border border-gray-800">
            {group.map((g, i) => (
              <Reveal key={g.name} delay={(i % 3) * 0.08} y={18} className="bg-ink">
                <div className="group p-8 h-full hover:bg-gray-100 transition-colors duration-200">
                  <h3 className="font-heading text-lg text-chalk mb-3 group-hover:text-brand-600 transition-colors">{g.name}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-28">
        <Reveal className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="font-display text-chalk leading-none mb-6" style={{ fontSize: 'clamp(40px, 6vw, 92px)' }}>
            LET’S <span className="bg-brand-gradient bg-clip-text text-transparent">TALK COVER.</span>
          </h2>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Speak to an independent Ceilao broker today — no obligation, no jargon, just honest advice.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/get-quote" className="inline-flex items-center px-10 py-4 bg-brand-gradient text-white font-display text-base tracking-widest uppercase transition-transform hover:-translate-y-0.5">
              Get a Quote
            </Link>
            <a href="tel:+94773057892" className="inline-flex items-center px-8 py-4 border border-brand text-brand font-display text-base tracking-widest uppercase hover:bg-brand hover:text-white transition-colors">
              Call 077 305 7892
            </a>
          </div>
          <p className="mt-8 font-body text-sm text-gray-500">
            info@ceilaoib.lk · No. 39, Perahera Mawatha, Colombo 03
          </p>
        </Reveal>
      </section>
    </main>
  );
}
