/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Jika kamu menggunakan folder app
    "./pages/**/*.{js,ts,jsx,tsx}", // Jika masih pakai folder pages
    "./components/**/*.{js,ts,jsx,tsx}" // Untuk komponen terpisah
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
