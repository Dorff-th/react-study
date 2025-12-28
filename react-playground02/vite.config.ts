import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: "./", 
  plugins: [react()],
  server: {
      host: true,       
      port: 5174,
  },     
  resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),  // 여기서 '@/'를 src로 지정
    } ,
  },
});