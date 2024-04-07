/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003F82",
        background: "#f2f5fc",
      },
    },
  },
  plugins: [],
};
