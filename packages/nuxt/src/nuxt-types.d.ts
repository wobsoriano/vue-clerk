import type { IsomorphicClerkOptions } from 'vue-clerk'
import type { ClerkOptions } from '@clerk/backend'
import type { CheckAuthorizationWithCustomPermissions, OrganizationCustomPermissionKey, OrganizationCustomRoleKey } from '@clerk/types'

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

type ProtectParams = {
  condition?: never
  role: OrganizationCustomRoleKey
  permission?: never
} | {
  condition?: never
  role?: never
  permission: OrganizationCustomPermissionKey
} | {
  condition: (has: CheckAuthorizationWithCustomPermissions) => boolean
  role?: never
  permission?: never
} | {
  condition?: never
  role?: never
  permission?: never
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: ProtectParams & {
      authenticatedRedirectUrl?: string
      guestRedirectUrl?: string
    }
  }
}

export {}
