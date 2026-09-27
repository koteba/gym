import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: { DEFAULT: '#0f0f0f', light: '#1a1a1a' },
        neon: { DEFAULT: '#10b981', dark: '#059669' },
        steel: { DEFAULT: '#6b7280', light: '#9ca3af' },
        paper: { DEFAULT: '#ffffff', muted: '#f3f4f6' },
      },
      fontFamily: {
        heading: ['var(--font-cairo)'],
        body: ['var(--font-tajawal)'],
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'rise-in': 'rise-in .7s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
};
export default config;
