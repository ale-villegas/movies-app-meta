import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'), // Alias para la carpeta src/styles
      '@variables': path.resolve(__dirname, 'src/styles/_variables.scss'), // Alias para el archivo de variables
      '@mixins': path.resolve(__dirname, 'src/styles/_mixins.scss'), // Alias para el archivo de mixins
    },
  },
});