import type { ComputedRef, Ref } from 'vue'
import type { ActJWTClaim, ActiveSessionResource, ClientResource, OrganizationCustomPermissionKey, OrganizationCustomRoleKey, OrganizationResource, Resources, UserResource } from '@clerk/types'
import type { deriveState } from './utils'
import type { BrowserClerk, HeadlessBrowserClerk } from './provideClerkToApp'
import type { IsomorphicClerk } from './isomorphicClerk'

export interface VueClerkInjectionKeyType {
  clerk: IsomorphicClerk
  /**
   * @deprecated Will be removed in the next release.
   */
  state: Resources
  isClerkLoaded: Ref<boolean>
  /**
   * @deprecated Will be removed in the next release.
   */
  derivedState: ComputedRef<ReturnType<typeof deriveState>>
  authCtx: ComputedRef<{
    userId: string | null | undefined
    sessionId: string | null | undefined
    actor: ActJWTClaim | null | undefined
    orgId: string | null | undefined
    orgRole: OrganizationCustomRoleKey | null | undefined
    orgSlug: string | null | undefined
    orgPermissions: OrganizationCustomPermissionKey[] | null | undefined
  }>
  clientCtx: ComputedRef<ClientResource | null | undefined>
  sessionCtx: ComputedRef<ActiveSessionResource | null | undefined>
  userCtx: ComputedRef<UserResource | null | undefined>
  organizationCtx: ComputedRef<OrganizationResource | null | undefined>
}

// export const VueClerkInjectionKey = Symbol('VueClerk') as InjectionKey<VueClerkInjectionKeyType>
export const VueClerkInjectionKey = 'VUE_CLERK'
