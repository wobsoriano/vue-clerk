import { clerkPlugin } from 'vue-clerk'
import type { AuthObject } from '@clerk/backend'
import { defineNuxtPlugin, navigateTo, useRuntimeConfig, useState } from '#imports'

export default defineNuxtPlugin({
  name: 'vue-clerk',
  setup(nuxtApp) {
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
