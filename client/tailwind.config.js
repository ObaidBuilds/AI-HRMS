/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        navy: "#1F2937",
        primary: "#111827",
        secondary: "#374151",
        head: "#4b5563",
      },
      colors: {
        primary: "#e5e7eb",
      },
      borderColor: {
        primary: "#4b5563",
        secondary: "#6b7280",
      },
    },
  },
  plugins: [],
};
