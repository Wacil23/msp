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
          50: "#e5fdf4",
          100: "#d6f6e8",
          200: "#b1e9d1",
          300: "#87ddb8",
          400: "#64d2a3",
          500: "#4ecc95",
          600: "#40c98e",
          700: "#2fb17b",
          800: "#239e6c",
          900: "#07895b",
        },
        secondary: {
          50: "#edf1fd",
          100: "#d7dff4",
          200: "#abbbeb",
          300: "#7d95e4",
          400: "#5775dd",
          500: "#4162da",
          600: "#3558da",
          700: "#2849c1",
          800: "#2140ad",
          900: "#153799",
        },
      },
    },
    fontFamily: {
      avenir: ["Avenir", "sans-serif"],
    },
  },
  plugins: [],
};
