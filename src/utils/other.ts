import type { IsomorphicClerk } from '../isomorphicClerk'

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
export function createGetToken(clerk: IsomorphicClerk) {
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
export function createSignOut(clerk: IsomorphicClerk) {
  return async (...args: any) => {
    await clerkLoaded(clerk)
    return clerk.signOut(...args)
  }
}
