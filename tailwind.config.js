// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       keyframes: {
        mine: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-20deg)" },
          "50%": { transform: "rotate(20deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        mine: "mine 0.8s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
