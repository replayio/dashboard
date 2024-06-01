/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'], // make sure all your file types and paths are included
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        progress: "progress 1s infinite linear",
      },
      keyframes: {
        progress: {
          "0%": { transform: " translateX(0) scaleX(0)" },
          "40%": { transform: "translateX(0) scaleX(0.4)" },
          "100%": { transform: "translateX(100%) scaleX(0.5)" },
        },
      },
      transformOrigin: {
        "left-right": "0% 50%",
      },
    },
  },
  plugins: [],
};
