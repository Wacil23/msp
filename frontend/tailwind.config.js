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
        primary: "#f6f9fb",
        secondary: "#09dc7e",
        darker: "#0a1c2d",
      },
      boxShadow: {
        header: "0px 2px 5px #f0f0f0",
      },
    },
    fontFamily: {
      silka: ["Silka", "sans-serif"],
    },
  },
  plugins: [],
};
