import { Clerk } from '@clerk/clerk-js'
import { type Plugin, ref } from 'vue'
import type { VueClerkOptions } from './createClerkInstance'
import { provideClerkToApp } from './createClerkInstance'

export type { VueClerkOptions }

export { Clerk } from '@clerk/clerk-js'

export { provideClerkToApp }

export const clerkPlugin: Plugin = {
  install(app, options: VueClerkOptions) {
    const isClerkLoaded = ref(false)
    const { publishableKey, domain, ...loadOptions } = options
    const clerk: Clerk = options.Clerk ?? new Clerk(publishableKey, domain)

    provideClerkToApp(app, clerk, loadOptions, {
      isClerkLoaded,
      shouldLoadClerk: true,
    })
  },
}
