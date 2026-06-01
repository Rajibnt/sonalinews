module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(210, 50%, 55%)",
        secondary: "hsl(210, 30%, 95%)",
        accent: "hsl(45, 90%, 55%)",
        bg: "hsl(210, 20%, 5%)",
        surface: "hsla(0, 0%, 100%, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"]
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};
