// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Baby-Content-Maker/', // penting untuk GitHub Pages
  build: {
    outDir: 'dist', // output default untuk Vite
    emptyOutDir: true // pastikan folder dist dibersihkan sebelum build
  },
  server: {
    port: 3000,
    open: true
  }
})
