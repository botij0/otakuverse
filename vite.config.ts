import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/mal-image": {
        target: "https://myanimelist.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mal-image/, ""),
      },
      "/mal-cdn-image": {
        target: "https://cdn.myanimelist.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mal-cdn-image/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
