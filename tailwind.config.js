/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#141414',
          soft: '#262626',
          deep: '#0a0a0a',
        },
        muted: {
          DEFAULT: '#707070',
          faint: '#a3a3a3',
          subtle: '#8a8a8e',
        },
        canvas: {
          DEFAULT: '#ffffff',
          soft: '#f8f8fa',
          subtle: '#f2f2f5',
          field: '#f4f4f6',
        },
        hairline: {
          DEFAULT: '#e5e5ea',
          soft: '#efeff2',
          strong: '#d1d1d6',
        },
        accent: {
          DEFAULT: '#0066ff',
          hover: '#0052cc',
          light: '#e8f1ff',
        },
      },
      borderRadius: {
        'pill': '9999px',
        'card-sm': '18px',
        'card': '26px',
        'card-lg': '34px',
        'ios': '30px',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Plus Jakarta Sans"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        'ios-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
        'ios-card': '0 12px 40px -6px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.02)',
        'ios-elevated': '0 24px 60px -12px rgba(0, 0, 0, 0.1), 0 4px 16px -3px rgba(0, 0, 0, 0.03)',
        'ios-pill': '0 2px 10px rgba(0, 0, 0, 0.06)',
      },
      transitionTimingFunction: {
        'ios-spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ios-smooth': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
