/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: "Roboto, sans-serif",
        title: "Lora,serif",
      },
      colors: {
        secondary: "#2c3d8f",
        logo: "#5AAEE0",
        banner: "#d0efdc",
        primary: "#5a81fa",
        black: "#1f1f1f",
        white: "#f8f9fd",
        zinc: "#f4f4f5",
      },
    },
  },
  plugins: [],
};
