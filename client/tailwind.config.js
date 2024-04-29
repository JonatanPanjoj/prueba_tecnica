/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-card': '#242731',
        'dark-background': '#1F2128',
        'dark-primary': '#6C5DD3',
      }
    },
  },
  plugins: [],
}

