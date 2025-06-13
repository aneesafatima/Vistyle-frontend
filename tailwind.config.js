/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "poppins-medium": ["poppins-medium"],
        "interTight-bold": ["interTight-bold"],
        "interTight-medium": ["interTight-medium"],
        "interTight-regular": ["interTight-regular"],
        "freckle-face-regular": ["freckle-face"],
        "arial-rounded" : ["arial-rounded"]
      },
    },
  },
  corePlugins: {
    backgroundOpacity: true,
  },
  plugins: [],
};
