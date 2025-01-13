/** @type {import('tailwindcss').Config} */


const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'primary': "#5f6FFF"
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px,1fr))'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
});
