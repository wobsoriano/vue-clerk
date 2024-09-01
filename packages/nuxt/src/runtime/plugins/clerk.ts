import { clerkPlugin } from 'vue-clerk'
import type { AuthObject } from 'h3-clerk'
import { defineNuxtPlugin, navigateTo, useRuntimeConfig, useState } from '#app'

export default defineNuxtPlugin({
  name: 'vue-clerk',
  enforce: 'pre',
  async setup(nuxtApp) {
    const serverInitialState = useState<AuthObject | undefined>('clerk-initial-state', () => undefined)

    if (import.meta.server) {
      const authContext = nuxtApp.ssrContext?.event.context.auth
      serverInitialState.value = authContext ? JSON.parse(JSON.stringify(authContext)) : undefined
    }

    nuxtApp.vueApp.use(clerkPlugin, {
      ...useRuntimeConfig().public.clerk,
      routerPush: (to: string) => navigateTo(to),
      routerReplace: (to: string) => navigateTo(to, { replace: true }),
      initialState: serverInitialState.value,
    })
  },
})
