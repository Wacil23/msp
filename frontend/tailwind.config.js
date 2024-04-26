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
        main: "#ffffff",
        primary: "#f4f4f4",
        secondary: "#caea7a",
        darker: "#191818",
      },
    },
    fontFamily: {
      avenir: ["Avenir", "sans-serif"],
    },
  },
  plugins: [],
};
