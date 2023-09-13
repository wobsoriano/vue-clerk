import type Clerk from '@clerk/clerk-js'
import type { ActiveSessionResource, InitialState, MembershipRole, OrganizationResource, Resources, UserResource } from '@clerk/types'

export function deriveState(clerkLoaded: boolean, state: Resources, initialState: InitialState | undefined) {
  if (!clerkLoaded && initialState)
    return deriveFromSsrInitialState(initialState)

  return deriveFromClientSideState(state)
}

function deriveFromSsrInitialState(initialState: InitialState) {
  const userId = initialState.userId
  const user = initialState.user as any as UserResource
  const sessionId = initialState.sessionId
  const session = initialState.session as any as ActiveSessionResource
  const organization = initialState.organization as any as OrganizationResource
  const orgId = initialState.orgId
  const orgRole = initialState.orgRole as MembershipRole
  const orgSlug = initialState.orgSlug
  const actor = initialState.actor

  return {
    userId,
    user,
    sessionId,
    session,
    organization,
    orgId,
    orgRole,
    orgSlug,
    actor,
    lastOrganizationInvitation: null,
    lastOrganizationMember: null,
  }
}

function deriveFromClientSideState(state: Resources) {
  const userId: string | null | undefined = state.user ? state.user.id : state.user
  const user = state.user
  const sessionId: string | null | undefined = state.session ? state.session.id : state.session
  const session = state.session
  const actor = session?.actor
  const organization = state.organization
  const orgId: string | null | undefined = state.organization ? state.organization.id : state.organization
  const orgSlug = organization?.slug
  const membership = organization
    ? user?.organizationMemberships?.find(om => om.organization.id === orgId)
    : organization
  const orgRole = membership ? membership.role : membership

  const lastOrganizationInvitation = state.lastOrganizationInvitation
  const lastOrganizationMember = state.lastOrganizationMember

  return {
    userId,
    user,
    sessionId,
    session,
    organization,
    orgId,
    orgRole,
    orgSlug,
    actor,
    lastOrganizationInvitation,
    lastOrganizationMember,
  }
}

/**
 * @param isomorphicClerk
 * @internal
 */
function clerkLoaded(isomorphicClerk: Clerk) {
  return new Promise<void>((resolve) => {
    if (isomorphicClerk.loaded)
      resolve()

    isomorphicClerk.load().then(() => resolve())
  })
}

/**
 * @param isomorphicClerk
 * @internal
 */
export function createGetToken(isomorphicClerk: Clerk) {
  return async (options: any) => {
    await clerkLoaded(isomorphicClerk)
    if (!isomorphicClerk.session)
      return null

    return isomorphicClerk.session.getToken(options)
  }
}

/**
 * @param isomorphicClerk
 * @internal
 */
export function createSignOut(isomorphicClerk: Clerk) {
  return async (...args: any) => {
    await clerkLoaded(isomorphicClerk)
    return isomorphicClerk.signOut(...args)
  }
}
