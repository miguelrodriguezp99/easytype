/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://miguel-main-server.vercel.app",
        changeOrigin: true,
      },
    },
  },
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
});
