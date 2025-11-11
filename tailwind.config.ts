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
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        secondary: {
          50: '#fef1f7',
          100: '#fde3ef',
          200: '#fbc7df',
          300: '#f89fcf',
          400: '#f46bb0',
          500: '#f038a0',
          600: '#d11d7a',
          700: '#a5155d',
          800: '#7a1045',
          900: '#4f0a2c',
        },
        accent: {
          50: '#fff5f7',
          100: '#ffe4ec',
          200: '#ffc9d9',
          300: '#ffa3c0',
          400: '#ff6b99',
          500: '#ff3d7f',
          600: '#e6005c',
          700: '#b30046',
          800: '#800033',
          900: '#4d001f',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-heading)'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(236, 72, 153, 0.1)',
        'medium': '0 4px 16px rgba(236, 72, 153, 0.15)',
        'large': '0 8px 24px rgba(236, 72, 153, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
