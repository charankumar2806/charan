/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 8px 30px rgba(15, 23, 42, 0.08)'
      },
      colors: {
        primary: '#0f172a',
        secondary: '#14b8a6',
        accent: '#2563eb'
      }
    }
  },
  plugins: []
};
