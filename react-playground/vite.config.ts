import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
   base: "./", // ✅ 요거 추가!
  plugins: [react()],
   
  resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),  // 여기서 '@/'를 src로 지정
    } ,
  },
});