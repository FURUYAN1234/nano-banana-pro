import { webSecurity } from './scripts/web-security.mjs';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [webSecurity({ allowMicrophone: true, connectSources: ["https://api.openai.com","https://generativelanguage.googleapis.com","https://api.codetabs.com","https://*.blob.core.windows.net"] }), react()],
  base: './',
  server: {
    // SSRテストでは再帰監視を省き、通常の開発時は自動更新を保つ。
    watch: process.env.NODE_TEST_CONTEXT ? null : undefined,
    port: 5173,
    strictPort: true,
    // ローカル開発時にブラウザのOriginヘッダーでAPIキーが拒否される問題を回避
    // 本番ビルド（GitHub Pages等）では使用されない
    proxy: {
      '/gemini-api': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gemini-api/, ''),
      },
    },
  },
})
