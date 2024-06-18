import { clerkPlugin } from 'vue-clerk'
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal'

export default defineNuxtPlugin((nuxtApp) => {
  const publishableKey = useRuntimeConfig().public.clerkPublishableKey as string
  const serverInitialState = useState<SignedInAuthObject | SignedOutAuthObject | undefined>('clerk-initial-state', () => undefined)

  if (import.meta.server) {
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
