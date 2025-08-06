// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],                  // 본문용
        body: ['Inter', 'sans-serif'],                  // 사용 시 font-body
        heading: ['"Roboto Slab"', 'serif'],            // 제목용
      },
      colors: {
        background: '#121212',
        card: '#1F1F1F',
        accent: '#EF4444',
        textLight: '#EAEAEA',
      },
    },
  },
  plugins: [],
};


