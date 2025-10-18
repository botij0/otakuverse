export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "#7a00ff",
        accentLime: "#c6ff00",
        warning: "#ff3131",
        asphalt: "#121212",
        dark: "#0D0C11",
      },
      fontFamily: {
        mochiyPopOne: ["MochiyPopOne", "sans-serif"],
        shipporiMincho: ["ShipporiMincho", "sans-serif"],
      },
    },
  },
  plugins: [],
};
