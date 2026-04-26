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
        // Surfaces — pure white. Differentiation through hairlines, not fills.
        main: "#FFFFFF", // page background
        cream: "#FFFFFF", // card surface (alias)

        // Accent fills — soft sage tints used as section/highlight backgrounds.
        primary: "#F4F8F2", // ultra-pale sage, alternating sections
        sand: "#F4F8F2",
        light: "#E4EFE2", // pale sage tint — chips, icon badges, hover

        // Accent — sage. Used for CTAs, eyebrows, focus, active states.
        secondary: "#4F7355", // refined sage, slightly punchier than before
        forest: "#3D5A42", // hover / pressed
        moss: "#6B8C70", // softer sage for secondary touches

        // Ink scale.
        darker: "#0E1311",
        ink: "#0E1311",
        "ink-2": "#5A615E",
        "ink-3": "#9CA09D",

        // Hairlines.
        line: "#E6E5DF",
        "line-soft": "#EFEEE8",

        // Optional warm accent — sparingly used for emergency.
        clay: "#B8826B",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      // Mobile-first typography. Caps at 18px on mobile.
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }], // 11px
        xs: ["0.75rem", { lineHeight: "1.1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.45rem" }], // 14px — body default
        base: ["1rem", { lineHeight: "1.55rem" }], // 16px — heading mobile
        lg: ["1.125rem", { lineHeight: "1.6rem" }], // 18px — hero mobile cap
        xl: ["1.25rem", { lineHeight: "1.7rem" }], // 20px — heading desktop
        "2xl": ["1.5rem", { lineHeight: "1.8rem" }], // 24px — large heading desktop
        "3xl": ["1.875rem", { lineHeight: "2.15rem" }], // 30px — landing hero desktop
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px — only landing
      },
      letterSpacing: {
        tightest: "-0.03em",
        tight: "-0.015em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,19,17,0.04), 0 12px 32px -16px rgba(14,19,17,0.08)",
        ring: "0 0 0 1px rgba(14,19,17,0.06)",
        card: "0 1px 0 rgba(14,19,17,0.03)",
        sage: "0 1px 2px rgba(79,115,85,0.08), 0 8px 24px -16px rgba(79,115,85,0.18)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      typography: () => ({
        msp: {
          css: {
            "--tw-prose-body": "#3A3F3D",
            "--tw-prose-headings": "#0E1311",
            "--tw-prose-links": "#4F7355",
            "--tw-prose-bold": "#0E1311",
            "--tw-prose-counters": "#5A615E",
            "--tw-prose-bullets": "#4F7355",
            "--tw-prose-quotes": "#0E1311",
            "--tw-prose-quote-borders": "#4F7355",
            "--tw-prose-th-borders": "#E6E5DF",
            "--tw-prose-td-borders": "#EFEEE8",
            maxWidth: "none",
            fontSize: "0.875rem",
            lineHeight: "1.7",
            h2: { fontWeight: "600", fontSize: "1rem", marginTop: "2rem" },
            h3: { fontWeight: "600", fontSize: "0.9375rem", marginTop: "1.5rem" },
            "ul > li::marker": { color: "#4F7355" },
            a: {
              color: "#4F7355",
              fontWeight: 500,
              textDecoration: "underline",
              textUnderlineOffset: "0.2em",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
