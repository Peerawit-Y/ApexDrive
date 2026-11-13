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
          dark: '#0B0F19',
          card: '#121826',
          border: '#1F293D',
          red: '#E11D48',
          accent: '#F43F5E',
          muted: '#94A3B8'
        }
      }
    },
  },
  plugins: [],
}
