/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./src/app.{js,jsx,ts,tsx}", // Entry files in the App folder directly under src
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ], // Any files inside the nested app folder,
  theme: {
    extend: {},
  },
  plugins: [],
};
