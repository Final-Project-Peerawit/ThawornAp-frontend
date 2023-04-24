module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "spin-delay": "spin 6s linear infinite 3s",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
