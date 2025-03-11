/** @type {import('tailwindcss').Config} */
const { colors } = require("./src/theme/colors");

module.exports = {
  content: [],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
