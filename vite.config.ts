import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    allowedHosts: ["2ec2-196-191-240-51.ngrok-free.app/"] // Replace with your ngrok URL
  }
})