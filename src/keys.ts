import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { ActJWTClaim, ActiveSessionResource, ClientResource, OrganizationCustomPermissionKey, OrganizationCustomRoleKey, OrganizationResource, UserResource } from '@clerk/types'
import type { IsomorphicClerk } from './isomorphicClerk'

export interface VueClerkInjectionKeyType {
  clerk: IsomorphicClerk
  isClerkLoaded: Ref<boolean>
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

export const VueClerkInjectionKey = Symbol('VueClerk') as InjectionKey<VueClerkInjectionKeyType>
