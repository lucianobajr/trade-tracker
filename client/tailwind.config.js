/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px', // Modifique de acordo com suas necessidades
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'black-secondary': '#1a1c1e',
        'transparent': '#ffffff',
        'gray-900': '#1a1c1e',
        'gray-100': '#f5f4f7',
        'gray-200': '#e1e0e3',
        'cyan-600': '#31af99',
        'cyan-700': '#197d7e',
        'error':"#E92C2C"
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
