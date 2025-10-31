const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFEBE9',
          100: '#D7CCC8',
          200: '#BCAAA4',
          300: '#A1887F',
          400: '#8D6E63',
          500: '#795548',
          600: '#6D4C41',
          700: '#5D4037',
          800: '#4E342E',
          900: '#3E2723',
          DEFAULT: '#795548',
        },
        secondary: {
          50: '#F1F8E9',
          100: '#DCEDC8',
          200: '#C5E1A5',
          300: '#AED581',
          400: '#9CCC65',
          500: '#8BC34A',
          600: '#7CB342',
          700: '#689F38',
          800: '#558B2F',
          900: '#33691E',
          DEFAULT: '#689F38',
        },
        accent: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
          DEFAULT: '#FFB300',
        },
      },
    },
  },
  plugins: [
    daisyui,
    // Fix DaisyUI picker bug
    function({ addBase }) {
      addBase({
        '[dir="rtl"] .select': {
          translate: '0.5rem 0',
        },
      });
    },
  ],
  daisyui: {
    themes: [
      {
        lesotly: {
          "primary": "#795548",
          "primary-content": "#ffffff",
          "secondary": "#689F38",
          "secondary-content": "#ffffff",
          "accent": "#FFB300",
          "accent-content": "#000000",
          "neutral": "#3d4451",
          "base-100": "#FAFAFA",
          "base-200": "#f5f5f5",
          "base-300": "#e0e0e0",
          "info": "#2094f3",
          "success": "#689F38",
          "warning": "#FFB300",
          "error": "#f44336",
        },
      },
    ],
    darkTheme: false,
    base: true,
    styled: true,
    utils: true,
    logs: false, // Disable DaisyUI logs
  },
};
