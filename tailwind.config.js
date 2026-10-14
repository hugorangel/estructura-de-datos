/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0f0f0f',
          secondary: '#1a1a1a',
          tertiary: '#262626',
        },
        element: {
          default: '#2d2d2d',
          current: '#fbbf24',
          comparing: '#f97316',
          visited: '#3b82f6',
          found: '#22c55e',
          modified: '#a855f7',
          deleting: '#ef4444',
        },
        border: {
          default: '#404040',
          current: '#fbbf24',
          comparing: '#f97316',
          visited: '#3b82f6',
          found: '#22c55e',
          modified: '#a855f7',
          deleting: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor' },
        },
      },
    },
  },
  plugins: [],
}
