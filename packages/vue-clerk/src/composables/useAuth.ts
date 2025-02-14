import type { CheckAuthorizationWithCustomPermissions, GetToken, SignOut, UseAuthReturn } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { invalidStateError, useAuthHasRequiresRoleOrPermission } from '../errors/messages'
import type { IsomorphicClerk } from '../isomorphicClerk'
import { useClerkProvider } from './useClerkProvider'

/**
 * @param clerk
 * @internal
 */
function clerkLoaded(clerk: IsomorphicClerk) {
  return new Promise<void>((resolve) => {
    if (clerk.loaded)
      resolve()

    clerk.addOnLoaded(() => resolve())
  })
}

/**
 * @param clerk
 * @internal
 */
function createGetToken(clerk: IsomorphicClerk) {
  return async (options: any) => {
    await clerkLoaded(clerk)
    if (!clerk.session)
      return null

    return clerk.session.getToken(options)
  }
}

/**
 * @param clerk
 * @internal
 */
function createSignOut(clerk: IsomorphicClerk) {
  return async (...args: any) => {
    await clerkLoaded(clerk)
    return clerk.signOut(...args)
  }
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
