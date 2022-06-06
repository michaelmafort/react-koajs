const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/*.{js,jsx}", "./src/components/*.{js,jsx}", "./src/components/**/*.{js,jsx,css}", "./public/*.{js,jsx,html}"],
  theme: {
    extend: {
    },
    fontFamily: {
      'sans': ['Roboto', 'ui-sans-serif', 'system-ui']
    },
    screens: {
      xs: '360px',
      ...defaultTheme.screens
    }
  },
  plugins: [],
}
