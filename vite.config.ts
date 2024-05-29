import { defineConfig } from "vite";
import path from 'path';
import glsl from "vite-plugin-glsl";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), glsl()],
  base: './',
  build: {outDir: 'build'},
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  }
});
