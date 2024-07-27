import { defineConfig } from 'tsup'

import vuePlugin from 'unplugin-vue/esbuild'
import autoPropsPlugin from '@vue.ts/tsx-auto-props/esbuild'
import { name, version } from './package.json'

const clerkJsVersion = '5'

export default defineConfig((overrideOptions) => {
  const isProd = overrideOptions.env?.NODE_ENV === 'production'
  const isWatch = !!overrideOptions.watch

  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    splitting: true,
    clean: true,
    minify: isProd,
    dts: false,
    esbuildPlugins: [
      vuePlugin(),
      autoPropsPlugin({
        include: ['**/*.ts'],
      }),
    ],
    define: {
      PACKAGE_NAME: `"${name}"`,
      PACKAGE_VERSION: `"${version}"`,
      JS_PACKAGE_VERSION: `"${clerkJsVersion}"`,
      __DEV__: `${isWatch}`,
    },
  }
})
