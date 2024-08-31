import { addPlugin, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { IsomorphicClerkOptions } from 'vue-clerk'

export type ModuleOptions = IsomorphicClerkOptions

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-clerk/nuxt',
    configKey: 'clerk',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.clerk = options

    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin'))

    addServerHandler({
      middleware: true,
      handler: resolver.resolve('./runtime/server/middleware'),
    })
  },
})
