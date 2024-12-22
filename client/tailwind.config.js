/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        navy: "#1F2937",
        primary: "#111827",
        secondary: "#374151",
      },
     
    },
  },
  plugins: [],
};
