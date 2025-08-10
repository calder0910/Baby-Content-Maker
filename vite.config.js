// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Baby-Content-Maker/', // wajib untuk GitHub Pages subfolder
  build: {
    outDir: 'dist', // default, tapi gue tulis biar jelas
    sourcemap: false // bisa true kalau mau debugging
  }
})
