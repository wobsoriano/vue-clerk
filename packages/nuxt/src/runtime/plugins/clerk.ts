import { clerkPlugin } from 'vue-clerk'
// @ts-expect-error: Nuxt imports
import { defineNuxtPlugin, navigateTo, useRuntimeConfig, useState } from '#app'

// TODO: Use AuthObject from @clerk/backend
type AuthObject = Record<string, unknown>

export default defineNuxtPlugin((nuxtApp) => {
  const serverInitialState = useState<AuthObject | undefined>('clerk-initial-state', () => undefined)

  // eslint-disable-next-line node/prefer-global/process
  if (process.env.server) {
    const authContext = nuxtApp.ssrContext?.event.context.auth
    serverInitialState.value = authContext ? JSON.parse(JSON.stringify(authContext)) : undefined
  }

  nuxtApp.vueApp.use(clerkPlugin, {
    ...useRuntimeConfig().public.clerk,
    routerPush: (to: string) => navigateTo(to),
    routerReplace: (to: string) => navigateTo(to, { replace: true }),
    initialState: serverInitialState.value,
  })
})
