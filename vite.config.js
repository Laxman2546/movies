import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Ensures Vite generates correct paths
  build: {
    outDir: "dist", // Ensure output is in dist/
  },
  server: {
    host: true,
  },
});
