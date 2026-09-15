/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f1f6f8',
          100: '#dcecf2',
          200: '#bcd9e5',
          300: '#90bdd2',
          400: '#6fa2b7',
          500: '#5b92a8', // Core brand teal/slate
          600: '#47768a', // Primary button
          700: '#3b6273', // Hover state
          800: '#2b4a59', // Dark slate-blue
          900: '#213945',
          950: '#14232b',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
