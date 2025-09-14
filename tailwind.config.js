/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        olive: "#849926",   // you can name it anything
      },
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}