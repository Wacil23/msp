/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#d0f4c3",
          100: "#c7f1b7",
          200: "#bdefab",
          300: "#b4ed9f",
          400: "#aaea93",
          500: "#a1e887",
          600: "#91d17a",
          700: "#81ba6c",
          800: "#71a25f",
          900: "#618b51",
        },
        darker: "#000D44",
      },
    },
    fontFamily: {
      avenir: ["Avenir", "sans-serif"],
    },
  },
  plugins: [],
};
