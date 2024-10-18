/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'charcoal-black': '#171719', // For Body
        'deep-slate': '#232229', // For list background
        'royal-purple': '#714DD9' //For list hover
      }
    },
  },
  plugins: [],
};
