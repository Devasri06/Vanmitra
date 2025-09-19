import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-map-gl": "react-map-gl/dist/esm", // <- add this
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
