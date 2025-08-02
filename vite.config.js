import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
    proxy: {
      '/admin': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/social': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/blog': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/otherServices': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/qualifications': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/experience': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/getImages': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/template_section/all': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/generateQRCode': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
      '/privacy': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true,
  },
});
