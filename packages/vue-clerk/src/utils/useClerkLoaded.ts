import { watch } from 'vue'

import { useClerkProvider } from '../composables/useClerkProvider'
import type { IsomorphicClerk } from '../isomorphicClerk'

/**
 * Executes a callback when Clerk is loaded.
 *
 * @param callback - Function to execute once Clerk is loaded
 * @example
 * ```ts
 * useClerkLoaded((clerk) => {
 *   clerk.redirectToSignUp(props);
 * });
 * ```
 */
export function useClerkLoaded(callback: (clerk: IsomorphicClerk) => void) {
  const { isClerkLoaded, clerk } = useClerkProvider()

  const stop = watch(
    isClerkLoaded,
    (loaded) => {
      if (loaded) {
        return
      }

      callback(clerk)
      stop()
    },
    { immediate: true },
  )
}
