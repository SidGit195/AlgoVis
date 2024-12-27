/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',
        secondary: '#ff4081',
        success: '#4caf50',
        comparing: '#ffeb3b',
        sorted: '#4caf50',
      }
    },
  },
  plugins: [],
}