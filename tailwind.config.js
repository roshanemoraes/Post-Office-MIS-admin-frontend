/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      xs: "768px",
      sm: "1100px",
      md: "1110px",
      lg: "1120px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', "serif"],
      },
    },
  },
  plugins: [],
};
