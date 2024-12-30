/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '576px',
        lg: '768px',
        xl: '1200px',
        xxl: '1440px',
      },
    },
    screens: {
      sm: '575.98px',
      md: '767.98px',
      lg: '991.98px',
      xl: '1199.98px',
      xxl: '1399.98px',
    },
  },
  plugins: [],
};
