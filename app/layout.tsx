import type { Metadata } from 'next';
import { Bebas_Neue, Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ceilao Insurance Brokers | Your Trusted Insurance Partner in Sri Lanka',
  description:
    'Ceilao Insurance Brokers — independent advice across Life and General insurance in Sri Lanka. Learn insurance, compare cover, and get a no-obligation quote.',
  keywords:
    'Ceilao, insurance brokers Sri Lanka, life insurance, general insurance, motor insurance, get a quote, Colombo insurance broker',
};

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="bg-ink text-chalk font-body antialiased">
        <AuthProvider>
          <Navigation />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
