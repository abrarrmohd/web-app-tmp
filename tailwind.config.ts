import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Stationery palette: cotton paper, green-black ink, oxblood, and watercolour washes
        paper: '#f8efe0',
        'paper-deep': '#f7e2d8',
        cotton: '#fffaf1',
        blushpaper: '#fbdde2',
        ink: '#243a30',
        'ink-soft': '#566b5f',
        oxblood: '#8f1d3f',
        terracotta: '#ec6f45',
        rosewash: '#ef7f95',
        sage: '#6fb277',
        ochre: '#f2a52b',
        magenta: '#d6337a',
        marigold: '#f89a1c',
        peacock: '#1b8e94',
        table: '#0e3a3c',
        'table-deep': '#082628',

        // Legacy names still used by the RSVP page
        night: '#1e2a23',
        ivory: '#f8f3ea',
        gold: '#b8893a',
        'gold-light': '#e6cf9f',
        'gold-pale': '#efe5d2',
        maroon: '#7d2a2a',
        'maroon-dark': '#4a1818',
        emerald: '#3f5e4b',
        'emerald-dark': '#2b3a2f',
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'serif'],
        ruqaa: ['var(--font-ruqaa)', 'serif'],
        display: ['var(--font-display)', 'serif'],
        heading: ['var(--font-heading)', 'serif'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2.5deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.8' },
          '30%': { opacity: '1' },
          '55%': { opacity: '0.65' },
          '75%': { opacity: '0.95' },
        },
        'lattice-drift': {
          from: { transform: 'translate(0, 0)' },
          to: { transform: 'translate(var(--drift-x), var(--drift-y))' },
        },
        'petal-fall': {
          from: { transform: 'translateY(-4%)' },
          to: { transform: 'translateY(100%)' },
        },
        'petal-sway': {
          '0%, 100%': { transform: 'translateX(-14px) rotate(-25deg)' },
          '50%': { transform: 'translateX(14px) rotate(35deg)' },
        },
      },
      animation: {
        sway: 'sway 7s ease-in-out infinite',
        glow: 'glow 3.2s ease-in-out infinite',
        'lattice-drift': 'lattice-drift 50s linear infinite',
        'petal-fall': 'petal-fall 24s linear infinite',
        'petal-sway': 'petal-sway 4s ease-in-out infinite',
      },
      boxShadow: {
        soft: '0 20px 50px -20px rgba(40, 30, 20, 0.35)',
        glow: '0 8px 24px -8px rgba(40, 30, 20, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
