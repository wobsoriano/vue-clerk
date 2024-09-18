import { clerkPlugin } from 'vue-clerk'
import type { InitialState } from '@clerk/types'
import { defineNuxtPlugin, navigateTo, useRuntimeConfig, useState } from '#imports'

export default defineNuxtPlugin({
  name: 'vue-clerk',
  setup(nuxtApp) {
    const initialState = useState<InitialState | undefined>('clerk-initial-state', () => undefined)

    if (import.meta.server) {
      initialState.value = nuxtApp.ssrContext?.event.context.__clerk_initial_state
    }

    nuxtApp.vueApp.use(clerkPlugin, {
      ...useRuntimeConfig().public.clerk,
      routerPush: (to: string) => navigateTo(to),
      routerReplace: (to: string) => navigateTo(to, { replace: true }),
      initialState: initialState.value,
    })
  },
})
