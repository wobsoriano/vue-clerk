import type { IsomorphicClerkOptions } from 'vue-clerk'
import type { ClerkOptions } from '@clerk/backend'

type ClerkPublicRuntimeOptions = Pick<
  IsomorphicClerkOptions,
  'publishableKey'
  | 'clerkJSUrl'
  | 'clerkJSVariant'
  | 'clerkJSVersion'
  | 'afterSignInUrl'
  | 'afterSignUpUrl'
  | 'signInUrl'
  | 'signUpUrl'
  | 'proxyUrl'
  | 'isSatellite'
  | 'domain'
> & Pick<ClerkOptions, 'apiUrl' | 'apiVersion'>

type ClerkRuntimeOptions = Pick<ClerkOptions, 'secretKey' | 'jwtKey'>

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    clerk: ClerkRuntimeOptions
  }

  interface PublicRuntimeConfig {
    clerk: ClerkPublicRuntimeOptions
  }
}

export {}
