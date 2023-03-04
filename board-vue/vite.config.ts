import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
