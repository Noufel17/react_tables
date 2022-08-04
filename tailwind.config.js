/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--bg-table-border)",
        head: "var(--bg-table-head)",
        alter: "var(--bg-table-alter)",
      },
    },
  },
  plugins: [],
};
