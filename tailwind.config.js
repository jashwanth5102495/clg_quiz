/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#000000', // Pure black for dark backgrounds
          800: '#1a1a1a', // Very dark gray for cards
          700: '#2a2a2a', // Dark gray for hover states
          600: '#404040', // Medium gray for borders
          500: '#525252', // Gray for disabled states
          400: '#737373', // Light gray for text
          300: '#a3a3a3', // Lighter gray
          200: '#d4d4d4', // Very light gray
          100: '#f5f5f5', // Almost white
          50: '#fafafa',  // Off white
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};