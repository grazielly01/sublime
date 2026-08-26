import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//APROVADO
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    watch: {
      usePolling: true
    }
  }
})
