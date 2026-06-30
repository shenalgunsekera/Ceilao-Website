'use client';

import Link from 'next/link';

const links = [
  { label: 'About Us', href: '/about' },
  { label: 'Learn Insurance', href: '/learn' },
  { label: 'Insurance Brokers', href: '/brokers' },
  { label: 'Life Insurance', href: '/life-insurance' },
  { label: 'General Insurance', href: '/general-insurance' },
  { label: 'Insurance Companies', href: '/companies' },
  { label: 'Regulator (IRCSL)', href: '/regulator' },
  { label: 'Ombudsman', href: '/ombudsman' },
  { label: 'Get a Quote', href: '/get-quote' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-800">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Top */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-[1.2fr_1.4fr_1fr] gap-12">
          <div>
            <Link href="/" className="flex items-center mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ceilao-logo.png" alt="Ceilao Insurance Brokers" className="h-14 w-auto" />
            </Link>
            <p className="font-body text-sm text-gray-500 leading-relaxed max-w-xs mb-8">
              Ceilao Insurance Brokers (Pvt) Ltd — independent insurance advice that helps Sri Lankans feel in control of their life and health.
            </p>
            <Link href="/get-quote" className="btn-brand">Get a Quote</Link>
          </div>

          <div>
            <p className="font-body text-xs tracking-widest uppercase text-gray-600 mb-6">Explore</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-gray-500 hover:text-brand transition-colors py-2 block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-xs tracking-widest uppercase text-gray-600 mb-6">Get in touch</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+94773057892" className="font-body text-sm text-gray-400 hover:text-brand transition-colors">
                  +94 77 305 7892
                </a>
              </li>
              <li>
                <a href="mailto:info@ceilaoib.lk" className="font-body text-sm text-gray-400 hover:text-brand transition-colors">
                  info@ceilaoib.lk
                </a>
              </li>
              <li className="font-body text-sm text-gray-500 leading-relaxed">
                No. 39, Perahera Mawatha,<br />Colombo 03, Sri Lanka
              </li>
              <li>
                <a href="https://wa.me/94773057892" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 font-body text-sm text-brand hover:underline">
                  Chat on WhatsApp →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-600">
            © 2026 Ceilao Insurance Brokers (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-gray-600">Regulated by IRCSL</span>
            <span className="font-body text-xs text-gray-600">·</span>
            <span className="font-body text-xs text-gray-600">Privacy Policy</span>
            <span className="font-body text-xs text-gray-600">·</span>
            <span className="font-body text-xs text-gray-600">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
