import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev: run with VITE_BASE=/ for localhost root. Builds default to the GitHub Pages base.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/astoria-motors-remake/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
