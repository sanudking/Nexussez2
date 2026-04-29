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
          black: '#050a0e',
          dark: '#0a1628',
          card: '#0d1f35',
          border: '#1a3a5c',
          accent: '#00d4ff',
          accent2: '#00ff88',
          warning: '#ff6b35',
          danger: '#ff3b5c',
          muted: '#4a7fa5',
          text: '#e0f0ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.4)',
        'glow-warning': '0 0 20px rgba(255, 107, 53, 0.4)',
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
