import { defineConfig } from 'tsup'

import vuePlugin from 'unplugin-vue/esbuild'

export default defineConfig({
  entry: ['src/index.ts', 'src/plugin.ts', 'src/headless.ts'],
  format: ['cjs', 'esm'],
  splitting: true,
  clean: false,
  dts: false,
  esbuildPlugins: [vuePlugin()],
})
