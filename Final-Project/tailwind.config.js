/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hover-element': "url('/assets/hover_element.png')",
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
    fontFamily: {
      'IBM-Plex-Mono': ['"IBM Plex Mono"', 'mono-space'],
      'DM-Serif-Display': ['"DM Serif Display"', 'serif'],
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true }),],
}

