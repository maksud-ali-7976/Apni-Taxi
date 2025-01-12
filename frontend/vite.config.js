import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',  // Set root to the root folder of your project
  publicDir: 'public',  // Vite will serve static assets from the public folder
  server: {
    port: 5173,  // Port to run your app on
  },
})
