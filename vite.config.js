import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
// import { terser } from 'rollup-plugin-terser'; .min.js
// import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    /* dts({
      insertTypesEntry: true,
    }), */
  ],
  build: {
    lib: {
      entry: "src/main.js",
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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
