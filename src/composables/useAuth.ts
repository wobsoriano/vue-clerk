import type { ActJWTClaim, CheckAuthorizationWithCustomPermissions, GetToken, OrganizationCustomRoleKey, SignOut } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { createGetToken, createSignOut, toComputedRefs } from '../utils'
import { invalidStateError, useAuthHasRequiresRoleOrPermission } from '../errors/messages'
import { useClerkProvider } from './useClerkProvider'

type CheckAuthorizationSignedOut = undefined
type CheckAuthorizationWithoutOrgOrUser = (params?: Parameters<CheckAuthorizationWithCustomPermissions>[0]) => false

type UseAuthReturn =
  | {
    isLoaded: false
    isSignedIn: undefined
    userId: undefined
    sessionId: undefined
    actor: undefined
    orgId: undefined
    orgRole: undefined
    orgSlug: undefined
    has: CheckAuthorizationSignedOut
    signOut: SignOut
    getToken: GetToken
  }
  | {
    isLoaded: true
    isSignedIn: false
    userId: null
    sessionId: null
    actor: null
    orgId: null
    orgRole: null
    orgSlug: null
    has: CheckAuthorizationWithoutOrgOrUser
    signOut: SignOut
    getToken: GetToken
  }
  | {
    isLoaded: true
    isSignedIn: true
    userId: string
    sessionId: string
    actor: ActJWTClaim | null
    orgId: null
    orgRole: null
    orgSlug: null
    has: CheckAuthorizationWithoutOrgOrUser
    signOut: SignOut
    getToken: GetToken
  }
  | {
    isLoaded: true
    isSignedIn: true
    userId: string
    sessionId: string
    actor: ActJWTClaim | null
    orgId: string
    orgRole: OrganizationCustomRoleKey
    orgSlug: string | null
    has: CheckAuthorizationWithCustomPermissions
    signOut: SignOut
    getToken: GetToken
  }

export function useAuth(): ToComputedRefs<UseAuthReturn> {
  const { clerk, authCtx } = useClerkProvider()

  const getToken: GetToken = createGetToken(clerk)
  const signOut: SignOut = createSignOut(clerk)

  const result = computed<UseAuthReturn>(() => {
    const { sessionId, userId, actor, orgId, orgRole, orgSlug, orgPermissions } = authCtx.value

    const has = (params: Parameters<CheckAuthorizationWithCustomPermissions>[0]) => {
      if (!params?.permission && !params?.role)
        throw new Error(useAuthHasRequiresRoleOrPermission)
      if (!orgId || !userId || !orgRole || !orgPermissions)
        return false

      if (params.permission)
        return orgPermissions.includes(params.permission)

      if (params.role)
        return orgRole === params.role

      return false
    }

    if (sessionId === undefined && userId === undefined) {
      return {
        isLoaded: false,
        isSignedIn: undefined,
        sessionId,
        userId,
        actor: undefined,
        orgId: undefined,
        orgRole: undefined,
        orgSlug: undefined,
        has: undefined,
        signOut,
        getToken,
      }
    }

    if (sessionId === null && userId === null) {
      return {
        isLoaded: true,
        isSignedIn: false,
        sessionId,
        userId,
        actor: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        has: () => false,
        signOut,
        getToken,
      }
    }

    if (!!sessionId && !!userId && !!orgId && !!orgRole) {
      return {
        isLoaded: true,
        isSignedIn: true,
        sessionId,
        userId,
        actor: actor || null,
        orgId,
        orgRole,
        orgSlug: orgSlug || null,
        has,
        signOut,
        getToken,
      }
    }

    if (!!sessionId && !!userId && !orgId) {
      return {
        isLoaded: true,
        isSignedIn: true,
        sessionId,
        userId,
        actor: actor || null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        has: () => false,
        signOut,
        getToken,
      }
    }

    throw new Error(invalidStateError)
  })

  return toComputedRefs(result)
}
