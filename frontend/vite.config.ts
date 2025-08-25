import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "pdfjs-worker": path.resolve(
        __dirname,
        "node_modules/pdfjs-dist/legacy/build/pdf.worker.min.js"
      ),
    },
  },
}));
