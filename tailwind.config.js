/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(1rem)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards'
      }
    },
  },
  plugins: [],
};