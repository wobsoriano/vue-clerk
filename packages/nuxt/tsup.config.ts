import { defineConfig } from 'tsup'

export default defineConfig(() => {
  return {
    entry: ['src/**/*.ts'],
    format: ['cjs', 'esm'],
    clean: true,
    minify: false,
    dts: true,
    external: ['#app', '#imports'],
    // Move to vue-clerk folder to be exported as vue-clerk/nuxt
    onSuccess: 'rm -rf ../vue-clerk/dist/nuxt && mv -f dist ../vue-clerk/dist/nuxt'
  }
})
