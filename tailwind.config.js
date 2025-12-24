/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wood': '#E8DCC4',
        'painted': '#1A1A1A',
        'hover-highlight': '#FFD700',
        'cat-0': '#9CA3AF',
        'cat-1': '#3B82F6',
        'cat-2': '#22C55E',
        'cat-3': '#EF4444',
        'cat-4': '#A855F7',
      },
    },
  },
  plugins: [],
}
