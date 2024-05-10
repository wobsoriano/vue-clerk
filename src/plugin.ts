import { Clerk } from '@clerk/clerk-js'
import type { Plugin } from 'vue'
import type { VueClerkOptions } from './createClerkInstance'
import { createClerkInstance, createClerkInstanceWithoutLoading } from './createClerkInstance'

export type { VueClerkOptions }

export { Clerk } from '@clerk/clerk-js'

export { createClerkInstance, createClerkInstanceWithoutLoading }

export const clerkPlugin: Plugin = {
  install(app, options: VueClerkOptions) {
    const { publishableKey, domain, ...loadOptions } = options
    const clerk: Clerk = options.Clerk ?? new Clerk(publishableKey, domain)

    createClerkInstance(app, clerk, loadOptions)
  },
}
