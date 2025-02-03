/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#081A51',
        'secondary': 'rgba(255,255,255,0.17)',
      }
    },
  },
  plugins: [],
}

