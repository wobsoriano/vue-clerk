import type { Plugin } from 'vue'
import { provideClerkToApp } from './provideClerkToApp'
<<<<<<< HEAD
import type { IsomorphicClerkOptions } from './types'

export { provideClerkToApp, provideClerkToVueApp }
=======

import type { IsomorphicClerkOptions } from './types'
>>>>>>> 4fe9d2c (update playground)

export const clerkPlugin: Plugin = {
  install(app, options: IsomorphicClerkOptions) {
    provideClerkToApp(app, options)
  },
}
<<<<<<< HEAD
=======

export {
  provideClerkToApp,
}
>>>>>>> 4fe9d2c (update playground)
