/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        accent: '#F59E0B'
      },
      boxShadow: {
        glass: '0 10px 40px rgba(15, 23, 42, 0.35)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};

