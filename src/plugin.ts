import type { Plugin } from 'vue'
import type { InitialState } from '@clerk/types'
import type { IsomorphicClerkOptions } from './types'

import { provideClerkToVueApp } from './provideClerkToVueApp'

export const clerkPlugin: Plugin = {
  install(app, options: IsomorphicClerkOptions & { initialState?: InitialState }) {
    provideClerkToVueApp(app, options)
  },
}

export {
  provideClerkToVueApp,
}
