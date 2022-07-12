import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const createSvg = require('./src/components/SvgIcon');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvg('./src/assets/icons/svg/')
  ],
  clearScreen: false, // 设置为false, 可以避免Vite清屏而错过在终端中打印某些关键信息
  server: {
    port: 8080,
    open: true,
    proxy: {
      'api': {
        target: 'http://xxxxxxx',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 配置scss全局变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/variables.scss";`,//配置变量
      }
    }
  },
  // 构建选项
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      }    
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    brotliSize: false,
    chunkSizeWarningLimit: 1000
  }
})
