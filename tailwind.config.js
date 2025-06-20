/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/converted-ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'skillora-bg': '#EFE4D2',
        'skillora-blue': '#254D70',
        'skillora-deep-blue': '#131D4F',
        'skillora-accent': '#954C2E',
      },
    },
  },
  plugins: [],
} 