/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0080FF",
      },
      maxWidth: {
        "3.5xl": "812px",
      },
      fontSize: {
        sm: "0.625rem",
        base: "1rem",
        base: "0.9375em",
        "2.5xl": "1.75rem",
      },
    },
  },
  plugins: [],
}
