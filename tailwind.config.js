/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "tw-",
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      xs:"300px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {},
  },
  plugins: [],
};
