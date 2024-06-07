import type { Plugin } from 'vue'
import type { IsomorphicClerkOptions } from './types'

import { provideClerkToVueApp } from './provideClerkToVueApp'

export const clerkPlugin: Plugin = {
  install(app, options: IsomorphicClerkOptions) {
    provideClerkToVueApp(app, options)
  },
}

export {
  provideClerkToVueApp,
}
