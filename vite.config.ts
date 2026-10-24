import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração do Vite — site estático do ONE G STUDIO.
// Build: `npm run build` → saída em `dist/` (usada pelo Cloudflare Pages).
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // Separar as dependências estáticas melhora cache e evita
        // re-descarregar o vendor quando só o código do site muda.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
        },
      },
    },
  },
})
