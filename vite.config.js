import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// pastikan base sesuai nama repo
export default defineConfig({
  plugins: [react()],
  base: '/Baby-Content-Maker/',
})
