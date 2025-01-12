/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // For React/Vite
    "./pages/**/*.{js,jsx,ts,tsx}", // For Next.js
    "./components/**/*.{js,jsx,ts,tsx}", // For Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
