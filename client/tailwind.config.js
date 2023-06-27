/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "14px 17px 40px 4px",
        inset: "inset 0px 18px 22px",
        darkinset: "0px 4px 4px inset",
      },
      screens: {
        sm: "640px", // Modifique de acordo com suas necessidades
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: () => ({
        white: "#ffffff",
        black: "#000000",
        "black-secondary": "#1a1c1e",
        transparent: "#ffffff",
        light:"#f2f5f6",
        gray:{
          100:"#f5f4f7",
          200:"#e1e0e3",
          900:"#1a1c1e"
        },
        cyan:{
          600:"#31af99",
          700: "#197d7e",
        },
        error: "#E92C2C",
        shadow: {
          500: "rgba(112, 144, 176, 0.08)",
        },
      }),
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
