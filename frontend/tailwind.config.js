/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#08090C',
          surface: '#0E1017',
          card: '#12151E',
          'card-hover': '#161B27',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-light': 'rgba(255, 255, 255, 0.14)',
          red: '#E11D48',
          'red-glow': '#FF2E5B',
          accent: '#F43F5E',
          gold: '#E5A93C',
          cyan: '#06B6D4',
          muted: '#8E9BB0'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      backgroundImage: {
        'carbon-pattern': 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        'mesh-gradient': 'radial-gradient(circle at 50% -20%, rgba(225, 29, 72, 0.12), transparent 70%)'
      }
    },
  },
  plugins: [],
}
