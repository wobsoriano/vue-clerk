import { Clerk } from '@clerk/clerk-js/headless'
import { type Plugin, ref } from 'vue'
import type { VueClerkOptions } from './provideClerkToApp'
import { provideClerkToApp } from './provideClerkToApp'

export type { VueClerkOptions }

export { Clerk, provideClerkToApp }

export const clerkPlugin: Plugin = {
  install(app, options: VueClerkOptions) {
    const isClerkLoaded = ref(false)
    const { publishableKey, domain, initialState, ...clerkOptions } = options
    const clerk = new Clerk(publishableKey, domain)

    provideClerkToApp(app, clerk, {
      isClerkLoaded,
      shouldLoadClerk: true,
      clerkOptions,
      initialState,
    })
  },
}
