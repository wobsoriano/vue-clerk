import { defineConfig } from 'tsup'

import vuePlugin from 'unplugin-vue/esbuild'
import autoPropsPlugin from '@vue.ts/tsx-auto-props/esbuild'
import { name, version } from './package.json'

export default defineConfig(() => {
  return {
    entry: {
      index: 'src/index.ts',
      internal: 'src/internal.ts',
    },
    format: ['cjs', 'esm'],
    splitting: true,
    clean: true,
    minify: false,
    dts: false,
    esbuildPlugins: [
      // Adds .vue files support
      vuePlugin(),
      // Adds runtime props type generation from TS types
      autoPropsPlugin({
        include: ['**/*.ts'],
      }),
    ],
    define: {
      PACKAGE_NAME: `"${name}"`,
      PACKAGE_VERSION: `"${version}"`,
    },
  }
})
