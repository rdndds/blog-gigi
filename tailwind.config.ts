import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#fefaf7',
          100: '#fdf4ed',
          200: '#fbe7d6',
          300: '#f8d4b1',
          400: '#f2b896',
          500: '#ea9560',
          600: '#c9774a',
          700: '#9b5e3a',
          800: '#704829',
          900: '#4a341a',
        },
        accent: {
          50: '#fffdf9',
          100: '#fefce8',
          200: '#fef9c3',
          300: '#fef08a',
          400: '#fde047',
          500: '#facc15',
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#854d0e',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-heading)'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(249, 115, 22, 0.1)',
        'medium': '0 4px 16px rgba(249, 115, 22, 0.15)',
        'large': '0 8px 24px rgba(249, 115, 22, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
