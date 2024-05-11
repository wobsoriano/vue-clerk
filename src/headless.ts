import { Clerk } from '@clerk/clerk-js/headless'
import { type Plugin, ref } from 'vue'
import type { VueClerkOptions } from './createClerkInstance'
import { provideClerkToApp } from './createClerkInstance'

export type { VueClerkOptions }

export { Clerk, provideClerkToApp }

export const clerkPlugin: Plugin = {
  install(app, options: VueClerkOptions) {
    const isClerkLoaded = ref(false)
    const { publishableKey, domain, ...loadOptions } = options
    const clerk = new Clerk(publishableKey, domain)

    provideClerkToApp(app, clerk, loadOptions, {
      isClerkLoaded,
      shouldLoadClerk: true,
    })
  },
}
