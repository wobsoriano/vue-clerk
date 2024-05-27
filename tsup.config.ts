import { defineConfig } from 'tsup'

import vuePlugin from 'unplugin-vue/esbuild'
import { name, version } from './package.json'

const clerkJsVersion = '5.5.1'

export default defineConfig((overrideOptions) => {
  const isWatch = !!overrideOptions.watch

  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    splitting: true,
    clean: false,
    dts: false,
    esbuildPlugins: [vuePlugin()],
    define: {
      PACKAGE_NAME: `"${name}"`,
      PACKAGE_VERSION: `"${version}"`,
      JS_PACKAGE_VERSION: `"${clerkJsVersion}"`,
      __DEV__: `${isWatch}`,
    },
  }
})
