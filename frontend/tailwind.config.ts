import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          black: '#0A0A0F',
          dark: '#0D0D14',
          card: '#13131A',
          border: '#2A2A38',
          accent: '#FF6B1A',
          accent2: '#00BFA6',
          warning: '#F5C842',
          danger: '#ff3b5c',
          muted: '#7A7A8A',
          text: '#F4F1EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(255, 107, 26, 0.4)',
        'glow-green': '0 0 20px rgba(0, 191, 166, 0.4)',
        'glow-warning': '0 0 20px rgba(245, 200, 66, 0.4)',
      },
      animation: {
        'radar-sweep': 'radarSweep 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
