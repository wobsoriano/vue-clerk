import type { IsomorphicClerkOptions } from 'vue-clerk'
import type { ClerkOptions } from '@clerk/backend'

type ClerkPublicRuntimeOptions = Pick<
  IsomorphicClerkOptions,
  'publishableKey'
  | 'clerkJSUrl'
  | 'clerkJSVariant'
  | 'clerkJSVersion'
  | 'signInFallbackRedirectUrl'
  | 'signUpFallbackRedirectUrl'
  | 'signInForceRedirectUrl'
  | 'signUpForceRedirectUrl'
  | 'signInUrl'
  | 'signUpUrl'
  | 'proxyUrl'
  | 'isSatellite'
  | 'domain'
> & Pick<ClerkOptions, 'apiUrl' | 'apiVersion' | 'telemetry'>

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
