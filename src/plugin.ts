import Clerk from '@clerk/clerk-js'
import type { Plugin } from 'vue'
import type { VueClerkOptions } from './createClerkInstance'
import { createClerkInstance } from './createClerkInstance'

export const clerkPlugin: Plugin = {
  install(app, options: VueClerkOptions) {
    const { publishableKey, domain, ...loadOptions } = options
    const clerk = new Clerk(publishableKey, domain)

    createClerkInstance(app, clerk, loadOptions)
  },
}
