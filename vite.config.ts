import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'
import { createVitePlugins } from './build/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: createVitePlugins(),

    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          // target: 'http://172.20.153.9:5001',//测试环境
          target: 'http://172.16.70.50:5001',
          ws: false,
          changeOrigin: true,
        },
      },
    },

    resolve: {
      alias: {
        // '~@': path.join(__dirname, './src'),
        // '@': path.join(__dirname, './src'),
        // '~': path.join(__dirname, './src/assets'),
        // '$': path.join(__dirname, './public'),
        // 设置路径
        '~': path.resolve(__dirname, './src/assets'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
        '~@': path.resolve(__dirname, './src'),
        '$': path.resolve(__dirname, './public'),
      },
    },
    // 确保 Vite 正确加载 .env 文件
    envDir: '.',
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          // https://github.com/wswmsword/postcss-mobile-forever
          viewport({
            appSelector: '#app',
            viewportWidth: 375,
            maxDisplayWidth: 600,
            rootContainingBlockSelectorList: [
              'van-tabbar',
              'van-popup',
            ],
          }),
        ],
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
    },
  }
}
