/** @type {import('tailwindcss').Config} */


const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./node_modules/flowbite/**/*.js"],
  darkMode: "media",
  theme: {
    extend:{
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require('flowbite/plugin')
  ],
});
