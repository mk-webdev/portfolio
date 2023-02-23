/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Courier New", "serif"],
      sans: ["Verdana", "sans-serif"],
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      md: "22px",
      lg: "26px",
      xl: "42px",
      "2xl": "68px",
      "3xl": "110px",
    },
    container: {
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6.25rem",
      },
      screens: {
        xs: "640px",
        sm: "1024px",
        md: "1200px",
        lg: "1400px",
        xl: "1520px",
        "2xl": "1720px",
      },
    },
    extend: {
      colors: {
        primary: "hsla(151, 100%, 50%, 1)",
        light: "hsla(149, 100%, 93%, 1)",
        dark: "hsla(0, 0%, 7%, 1)",
      },
    },
  },
  plugins: [],
};
