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
      fontSize: {
        // Title
        title: {
          lg: ['1.75rem', { fontWeight: 'bold', lineHeight: '1.2' }],
          md: ['1.5rem', { fontWeight: 'bold', lineHeight: '1.2' }],
          sm: ['1.125rem', { fontWeight: 'bold', lineHeight: '1.2' }],
        },

        // Subtitle
        subtitle: ['1rem', { fontWeight: 'semibold', lineHeight: '1.2' }],

        // Body
        body: {
          md: ['1rem', { fontWeight: 'regular', lineHeight: '1.2' }],
          sm: ['0.875rem', { fontWeight: 'regular', lineHeight: '1.2' }],
          xs: ['0.75rem', { fontWeight: 'regular', lineHeight: '1.2' }],
        },

        // Label
        label: {
          md: ['0.75rem', { fontWeight: 'medium', lineHeight: '1.2' }],
          sm: ['0.625rem', { fontWeight: 'medium', lineHeight: '1.2' }],
        },

        // Action
        action: {
          md: ['1rem', { fontWeight: 'medium', lineHeight: '1.2' }],
          sm: ['0.875rem', { fontWeight: 'medium', lineHeight: '1.2' }],
        },
      },
    },
  },
  plugins: [],
}
