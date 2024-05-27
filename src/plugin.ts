import type { Plugin } from 'vue'
<<<<<<< HEAD
import { provideClerkToApp } from './provideClerkToApp'
<<<<<<< HEAD
import type { IsomorphicClerkOptions } from './types'

export { provideClerkToApp, provideClerkToVueApp }
=======
=======
import { provideClerkToVueApp } from './provideClerkToApp'
>>>>>>> 61c6683 (chore(provideClerkToApp): rename to provideClerkToVueApp)

import type { IsomorphicClerkOptions } from './types'
>>>>>>> 4fe9d2c (update playground)

export const clerkPlugin: Plugin = {
  install(app, options: IsomorphicClerkOptions) {
    provideClerkToVueApp(app, options)
  },
}
<<<<<<< HEAD
=======

export {
  provideClerkToVueApp,
}
>>>>>>> 4fe9d2c (update playground)
