const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      zinc: colors.zinc,
      nav: "#181818",
      themeBlack: "#202020",
      buttonBlue: "#4588ED",
      buttonBlack: "181818"
    },
    extend: {},
  },
  plugins: [],
}
