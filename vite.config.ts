import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: "/js-robb-player",
  server: {
    // Hot module reload
    hmr: false,
  }
})
