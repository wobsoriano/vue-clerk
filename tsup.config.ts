import { defineConfig } from 'tsup'

import vuePlugin from 'unplugin-vue/esbuild'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  splitting: false,
  clean: false,
  dts: false,
  esbuildPlugins: [vuePlugin()],
})
