import {fileURLToPath, URL} from 'node:url'

import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'
import {libInjectCss} from 'vite-plugin-lib-inject-css'

export default defineConfig({
  plugins: [
    vue(),
    libInjectCss()
  ],
  build: {
    lib: {
      entry: "src/main.ts",
      name: 'MultiStepWizard',
      formats: ["es", "cjs", "umd"],
      fileName: format => `multi-step-wizard.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: "named",
        globals: {
          vue: 'Vue',
        },
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@multi-steps-wizard': fileURLToPath(new URL('./dist', import.meta.url))
    }
  },
  optimizeDeps: {
    exclude: ['playground']
  }
})
