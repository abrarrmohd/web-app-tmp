import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // desi nikkah/walima palette: deep maroon, rich gold, emerald green
        blush: '#f6e8c9',
        rose: '#9c1338',
        plum: '#4a0d1f',
        ivory: '#fffaf3',
        gold: '#c8992f',
        'gold-light': '#ecd39a',
        maroon: '#7a1030',
        'maroon-dark': '#3a0a17',
        emerald: '#155c44',
        'emerald-dark': '#0b3a2b',
        cream: '#fbf1de',
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'serif'],
        display: ['var(--font-display)', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(58, 10, 23, 0.14)',
        gold: '0 0 0 1px rgba(200, 153, 47, 0.4), 0 12px 30px rgba(58, 10, 23, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
