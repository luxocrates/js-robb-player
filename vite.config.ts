import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/js-robb-player",
  server: {
    // Hot module reload
    hmr: false,
  }
})
