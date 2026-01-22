import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': 'http://localhost:3000',
      '/products': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
    }
  }
})
