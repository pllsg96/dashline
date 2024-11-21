import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: '0.0.0.0', // Escuta em todas as interfaces de rede
    port: 3000,      // Porta padrão do Vite, ou escolha outra porta
  }
})
