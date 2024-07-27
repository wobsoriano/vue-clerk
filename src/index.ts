import './polyfills'

import SignInButton from './components/SignInButton.vue'
import SignUpButton from './components/SignUpButton.vue'
import SignOutButton from './components/SignOutButton.vue'
import SignInWithMetamaskButton from './components/SignInWithMetamaskButton.vue'
import WithUser from './components/WithUser.vue'
import WithClerk from './components/WithClerk.vue'
import WithSession from './components/WithSession.vue'

export {
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignInWithMetamaskButton,
  WithClerk,
  WithSession,
  WithUser,
}

export {
  useAuth,
} from './composables/useAuth'

export {
  useUser,
} from './composables/useUser'

export {
  useSession,
} from './composables/useSession'

export {
  useClerk,
} from './composables/useClerk'

export {
  useClerkProvider,
  useClerkProvide,
} from './composables/useClerkProvider'

export {
  useSignIn,
} from './composables/useSignIn'

export {
  useSignUp,
} from './composables/useSignUp'

export {
  useSessionList,
} from './composables/useSessionList'

export {
  useOrganization,
} from './composables/useOrganization'

export {
  VueClerkInjectionKey,
  VueClerkInjectionKeyType,
} from './keys'

export type {
  IsomorphicClerkOptions,
} from './types'

export {
  clerkPlugin,
  provideClerkToVueApp,
} from './plugin'

export * from './components/uiComponents'
export * from './components/controlComponents'
