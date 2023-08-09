/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  theme: {
    extend: {},
    screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
    }
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

