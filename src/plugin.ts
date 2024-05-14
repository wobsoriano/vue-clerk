import type { Plugin } from 'vue'
import { provideClerkToApp } from './provideClerkToApp'
import type { IsomorphicClerkOptions } from './types'

export { provideClerkToApp, provideClerkToVueApp }

export const clerkPlugin: Plugin = {
  install(app, options: IsomorphicClerkOptions) {
    provideClerkToApp(app, options)
  },
}
