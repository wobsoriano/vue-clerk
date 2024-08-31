import { clerkPlugin } from 'vue-clerk'
import { shadesOfPurple } from '@clerk/themes'
import type { AuthObject } from '@clerk/backend'

export default defineNuxtPlugin((nuxtApp) => {
  const publishableKey = useRuntimeConfig().public.clerkPublishableKey as string
  const serverInitialState = useState<AuthObject | undefined>('clerk-initial-state', () => undefined)

  if (import.meta.server) {
    const authContext = nuxtApp.ssrContext?.event.context.auth
    serverInitialState.value = authContext ? JSON.parse(JSON.stringify(authContext)) : undefined
  }

  nuxtApp.vueApp.use(clerkPlugin, {
    publishableKey,
    routerPush: (to: string) => navigateTo(to),
    routerReplace: (to: string) => navigateTo(to, { replace: true }),
    initialState: serverInitialState.value,
    appearance: {
      baseTheme: shadesOfPurple,
    },
  })
})
