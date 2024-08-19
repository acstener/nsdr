module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nsdr-dark': '#0a192f',
        'nsdr-light': '#8892b0',
        'nsdr-accent': '#64ffda',
        'site-bg': '#151518',
        'track-bg': '#1e1c20',
        'track-border': '#2f2e31',
        'track-hover': '#5e5e60',
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'sans-serif'],
      },
      maxWidth: {
        'track': '796px',
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}