import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    root: fileURLToPath(new URL('../playground', import.meta.url)),
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
        '@multi-steps-wizard': fileURLToPath(new URL('../dist', import.meta.url))
      }
    },
  }
)
