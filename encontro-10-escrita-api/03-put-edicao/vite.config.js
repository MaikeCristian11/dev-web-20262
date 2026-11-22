import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // './' faz o build gerar caminhos relativos. Sem isso, a página
  // publicada em um subdiretório do GitHub Pages não acha os arquivos.
  base: './',
});
