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
      buttonBlack: "#181818",
      buttonGreen: "#26EF6B",
      buttonRed: "#EF2626",
      buttonOrange: "#EF8726"
    },
    extend: {},
  },
  plugins: [],
}
