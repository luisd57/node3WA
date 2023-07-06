/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'customBeigeColor': '#f4f1e1',
        'customBrownColor': '#321e1e',
        'customLighBeigeColor': '#bdb498'
      },
    },
  },
  plugins: [],
}