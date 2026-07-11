import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Easy-on-the-eyes light theme ──
        // Text and surfaces are NEUTRAL (soft near-black + cool greys) so long
        // reading is comfortable; the coral #FF7558 is used strictly as the
        // accent — buttons, links, highlights — never for body text.
        ink: '#FFFFFF',
        chalk: '#20242C',
        'gray-900': '#F7F8FA', // lightest surface (cards, footer, menu)
        'gray-800': '#E8EBEF', // hairline borders / dividers
        'gray-700': '#D3D8DF', // input borders
        'gray-600': '#8B93A0', // muted icon / faint text
        'gray-500': '#69717E', // muted labels (readable on white)
        'gray-400': '#4B535F', // secondary text
        'gray-300': '#353D49', // strong secondary text
        'gray-200': '#EDF0F3',
        'gray-100': '#FAFBFC',
        // ── Ceilao brand coral (#FF7558 exact) ──
        brand: {
          DEFAULT: '#FF7558',
          light: '#FFA490',
          dark: '#F0532F',
          50: '#FFF4F1',
          100: '#FFE5DE',
          200: '#FFCBBE',
          300: '#FFA490',
          400: '#FF8A70',
          500: '#FF7558',
          600: '#F0532F',
          700: '#D13F1F',
          800: '#A93217',
          900: '#7E2611',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FFA490 0%, #FF7558 50%, #F0532F 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(255,117,88,0.12), rgba(240,83,47,0.08))',
        'brand-radial': 'radial-gradient(1200px 600px at 70% -10%, rgba(255,117,88,0.14), transparent 60%)',
      },
      boxShadow: {
        brand: '0 18px 50px -12px rgba(255,117,88,0.35)',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'line-grow': 'lineGrow 1s ease forwards',
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
