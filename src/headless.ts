import Clerk from '@clerk/clerk-js/headless'
import type { Plugin } from 'vue'
import { createClerkInstance } from './createClerkInstance'

export const clerkPlugin: Plugin = {
  install(app, {
    publishableKey,
    options,
    instanceOptions,
  }) {
    const clerk = new Clerk(publishableKey, instanceOptions)

    createClerkInstance(app, clerk, options)
  },
}
