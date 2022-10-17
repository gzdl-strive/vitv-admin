import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

import createSvg from './src/components/SvgIcon';

const generateSvg = (path_arr: string[]) => {
  const response = path_arr.map(path => createSvg(`./src/assets/${path}/`));
  return response;
}

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver()
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        //自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true,
    }),
    [...generateSvg(['svg', 'svg-copy'])]
  ],
  clearScreen: false, // 设置为false, 可以避免Vite清屏而错过在终端中打印某些关键信息
  server: {
    port: 8000,
    open: true,
    proxy: {
      '/asilu': {
        target: 'http://query.asilu.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/asilu/, '')
      }
    }
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
        additionalData: `@use "@/style/variable.scss" as *;`
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
