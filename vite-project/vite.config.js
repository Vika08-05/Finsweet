import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      // Contact form mailer server
      '/api/send-email': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
        timeout: 10000,
      },
      // Proxy API calls to the backend running on port 4000
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        // increase proxy timeout (ms) in case DynamoDB scan / backend is slow
        timeout: 10000,
      }
    }
  }
});