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
        primary: "#F3F4F5",
        secondary: "#5abb41",
        darker: "#232323",
        light: "#D5F1C4",
      },
      boxShadow: {
        header: "0px 2px 5px #f0f0f0",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
    },
    keyframes: {
      "infinite-scroll": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-100%)" },
      },
    },
    fontFamily: {
      silka: ["Silka", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
