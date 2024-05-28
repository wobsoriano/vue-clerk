import { Clerk } from '@clerk/clerk-js'
import { type Plugin, ref } from 'vue'
import type { VueClerkOptions } from './provideClerkToApp'
import { provideClerkToApp, provideClerkToVueApp } from './provideClerkToApp'

export type { VueClerkOptions }

export { Clerk } from '@clerk/clerk-js'

export { provideClerkToApp, provideClerkToVueApp }

export const clerkPlugin: Plugin = {
  install(app, options: VueClerkOptions) {
    const isClerkLoaded = ref(false)
    const { publishableKey, domain, initialState, ...clerkOptions } = options
    const clerk: Clerk = options.Clerk ?? new Clerk(publishableKey, domain)

    provideClerkToVueApp(app, clerk, {
      isClerkLoaded,
      shouldLoadClerk: true,
      clerkOptions,
      initialState,
    })
  },
}
