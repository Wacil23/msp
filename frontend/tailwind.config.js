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
          50: "#f6fde4",
          100: "#eef9d2",
          200: "#ddf1a8",
          300: "#caea7a",
          400: "#bbe353",
          500: "#b0df3a",
          600: "#abdd2b",
          700: "#96c41c",
          800: "#84ae13",
          900: "#6f9700",
        },
        darker: "#234338",
        darkLight: "#2C5446",
        darkStroke: "#356554",
        main: "#FAFDF2",
        lightGreen: "#F6FBE9",
        stroke: "#E5F5BD",
      },
    },
    fontFamily: {
      avenir: ["Avenir", "sans-serif"],
    },
  },
  plugins: [],
};
