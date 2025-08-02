// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        'black-3': '#1e1e1e',
        'light-grey-3': '#f5f5f5',
        'muted': '#ffffff21',
        'black-2': '#ffffff21',
      }
    },
  },
  plugins: [],
}
