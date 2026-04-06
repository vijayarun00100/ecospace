/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')], 
  theme: {
    extend: {
      colors:{
        'main-bg': '#FFFBE6',
      }
    },
  },
  plugins: [],
};
