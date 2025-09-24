/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#4a5d23',
          'green-light': '#6b7c47',
        },
        secondary: {
          gray: '#2c2c2c',
          'gray-light': '#f5f5f5',
          'gray-muted': '#888888',
        },
        cream: '#fafafa',
        gold: '#d4af37',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
