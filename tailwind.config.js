/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nsdr-dark': '#0a1929',
        'nsdr-light': '#8892b0',
        'nsdr-accent': '#64ffda',
        'nsdr-purple': '#b794f4',
        'nsdr-pink': '#f687b3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'inner-glow': 'inset 0 0 20px rgba(100, 255, 218, 0.15)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}