import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({command, mode}) => {
    return {
      root: fileURLToPath(new URL('../playground', import.meta.url)),
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../src', import.meta.url)),
          '@multi-steps-wizard': fileURLToPath(new URL('../src/main.ts', import.meta.url))
        }
      },
    }
  }
)
