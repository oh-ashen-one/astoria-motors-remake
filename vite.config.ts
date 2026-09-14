import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/astoria-motors-remake/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
