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
        // ── Light orange/white theme ──
        // Tokens are REMAPPED so the whole site reads white + orange:
        //   ink   = page background (white)
        //   chalk = primary text (deep burnt-orange, near-black but warm)
        //   gray-900..700 = light orange surfaces / borders
        //   gray-600..300 = readable orange-brown text tones
        ink: '#FFFFFF',
        chalk: '#3A1605',
        'gray-900': '#FFF4ED', // lightest orange surface (cards, footer, menu)
        'gray-800': '#FBDDC8', // hairline borders / dividers
        'gray-700': '#F6C9A8', // input borders
        'gray-600': '#A85A2E', // muted icon / faint text
        'gray-500': '#9A4A1E', // muted labels (readable on white)
        'gray-400': '#84380F', // secondary text
        'gray-300': '#6E2E0C', // strong secondary text
        'gray-200': '#FCE7D7',
        'gray-100': '#FFF1E7',
        // ── Ceilao brand: orange + white, with orange gradients ──
        brand: {
          DEFAULT: '#FF6A1A',
          light: '#FF8B5A',
          dark: '#E8431E',
          50: '#FFF4ED',
          100: '#FFE6D5',
          200: '#FFC9A3',
          300: '#FFA868',
          400: '#FF8B5A',
          500: '#FF6A1A',
          600: '#E8431E',
          700: '#C23512',
          800: '#9A2A0F',
          900: '#7A220D',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF8B5A 0%, #FF6A1A 50%, #E8431E 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(255,139,90,0.14), rgba(232,67,30,0.10))',
        'brand-radial': 'radial-gradient(1200px 600px at 70% -10%, rgba(255,106,26,0.22), transparent 60%)',
      },
      boxShadow: {
        brand: '0 18px 50px -12px rgba(255,106,26,0.45)',
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
