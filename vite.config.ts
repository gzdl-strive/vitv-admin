import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8000,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  // css相关配置
  css: {
    // css modules配置 
    modules: {
      // 可以通过 generateScopedName 属性来对生成的类名进行自定义
      generateScopedName: "[name]__[local]__[hash:base64:5]"
    },
    preprocessorOptions: {
      scss: {
        // additionalData的内容会在每个scss文件的开头自动注入
        additionalData: `@import "@/style/variable.scss";`
      }
    }
  },
  // 构建选项
  build: {
    outDir: 'dist', // 输出目录
    sourcemap: false, // 构建后不生成source map文件
    // 将js和css、静态资源拆分到各自的文件夹下
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      }
    }
  }
});
