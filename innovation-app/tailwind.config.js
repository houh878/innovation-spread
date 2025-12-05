/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        accent: '#F59E0B',
        glass: 'rgba(255,255,255,0.12)',
      },
      boxShadow: {
        glow: '0 0 25px rgba(59,130,246,0.4)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

