import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    allowedHosts: ["3aeb-196-191-240-129.ngrok-free.app"] // Replace with your ngrok URL
  }
})