/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'background': '#1E1E25',
        'darkgray': '#2D2D36',
        'lightgray': '#656566',
        'palelime': '#D5FF5F'
      },
    },
  },
  plugins: [],
}

