import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_ENV__: process.env.VITE_API_BASE_URL,
  },
  assetsInclude: ["**/*.mp3"],
});
