/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'form-bg-img': "url('/src/images/blob-scatter-haikeiInvert.svg')",
        'list-bg-img': "url('/src/images/blob-scatter-haikei.svg')"
      },
    },
  },
  plugins: [],
}