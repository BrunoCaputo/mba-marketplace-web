/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', '"DM Sans"', 'sans-serif'],
      },
      colors: {
        // Orange
        'orange-base': '#F24D0D',
        'orange-dark': '#C43C08',

        // Blue
        'blue-light': '#D7EFF9',
        'blue-base': '#5EC5FD',
        'blue-dark': '#009CF0',

        // Shape
        surface: '#FBF4F4',
        shape: '#F5EAEA',

        // Grayscale
        gray: {
          100: '#ADADAD',
          200: '#949494',
          300: '#666666',
          400: '#3D3D3D',
          500: '#1D1D1D',
        },

        // Semantic
        danger: '#DC3545',
        success: '#28A745',
      },
    },
  },
  plugins: [],
}
