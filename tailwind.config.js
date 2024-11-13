/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'Poppins', 'sans-serif'],
      },
      colors: {
        // Orange
        orange: {
          base: '#F24D0D',
          dark: '#C43C08',
        },

        // Blue
        blue: {
          light: '#D7EFF9',
          base: '#5EC5FD',
          dark: '#009CF0',
        },

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

        // Shadcn UI
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      fontSize: {
        title: {
          lg: ['1.75rem', { fontWeight: 'bold', lineHeight: '1.2' }],
          md: ['1.5rem', { fontWeight: 'bold', lineHeight: '1.2' }],
          sm: ['1.125rem', { fontWeight: 'bold', lineHeight: '1.2' }],
        },
        subtitle: ['1rem', { fontWeight: 'semibold', lineHeight: '1.2' }],
        body: {
          md: ['1rem', { fontWeight: 'regular', lineHeight: '1.2' }],
          sm: ['0.875rem', { fontWeight: 'regular', lineHeight: '1.2' }],
          xs: ['0.75rem', { fontWeight: 'regular', lineHeight: '1.2' }],
        },
        label: {
          md: ['0.75rem', { fontWeight: 'medium', lineHeight: '1.2' }],
          sm: ['0.625rem', { fontWeight: 'medium', lineHeight: '1.2' }],
        },
        action: {
          md: ['1rem', { fontWeight: 'medium', lineHeight: '1.2' }],
          sm: ['0.875rem', { fontWeight: 'medium', lineHeight: '1.2' }],
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [import('tailwindcss-animate')],
}
