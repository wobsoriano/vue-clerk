import './polyfills'

import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import SignInButton from './components/SignInButton.vue'
import SignUpButton from './components/SignUpButton.vue'
import SignOutButton from './components/SignOutButton.vue'
import SignInWithMetamaskButton from './components/SignInWithMetamaskButton.vue'
import UserProfile from './components/UserProfile.vue'
import UserButton from './components/UserButton.vue'
import WithUser from './components/WithUser.vue'
import OrganizationProfile from './components/OrganizationProfile.vue'
import CreateOrganization from './components/CreateOrganization.vue'
import OrganizationSwitcher from './components/OrganizationSwitcher.vue'
import OrganizationList from './components/OrganizationList.vue'
import WithClerk from './components/WithClerk.vue'
import WithSession from './components/WithSession.vue'

export {
  SignIn,
  SignUp,
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignInWithMetamaskButton,
  UserProfile,
  UserButton,
  WithClerk,
  WithSession,
  WithUser,
  OrganizationProfile,
  CreateOrganization,
  OrganizationSwitcher,
  OrganizationList,
}

export * from './controlComponents'

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
