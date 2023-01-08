import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({
    template: { transformAssetUrls }
  }),
  
  quasar({
    sassVariables: 'src/quasar-variables.sass'
  })],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
