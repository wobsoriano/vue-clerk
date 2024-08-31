import { clerkPlugin } from 'vue-clerk'
// @ts-expect-error: Nuxt imports
import { defineNuxtPlugin, navigateTo, useRuntimeConfig, useState } from '#app'

// TODO: Use AuthObject from @clerk/backend
type AuthObject = Record<string, unknown>

export default defineNuxtPlugin((nuxtApp) => {
  const publishableKey = useRuntimeConfig().public.clerkPublishableKey as string
  const serverInitialState = useState<AuthObject | undefined>('vue-clerk-initial-state', () => undefined)

  // eslint-disable-next-line node/prefer-global/process
  if (process.env.server) {
    const authContext = nuxtApp.ssrContext?.event.context.auth
    serverInitialState.value = authContext ? JSON.parse(JSON.stringify(authContext)) : undefined
  }

  nuxtApp.vueApp.use(clerkPlugin, {
    publishableKey,
    routerPush: (to: string) => navigateTo(to),
    routerReplace: (to: string) => navigateTo(to, { replace: true }),
    initialState: serverInitialState.value,
  })
})
