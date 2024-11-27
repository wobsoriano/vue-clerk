import type { LoadedClerk } from '@clerk/types'
import { watch } from 'vue'

import { useClerk } from '../composables/useClerk'

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
export function useClerkLoaded(callback: (clerk: LoadedClerk) => void) {
  const clerk = useClerk()

  const stop = watch(
    clerk,
    (unwrappedClerk) => {
      if (!unwrappedClerk?.loaded) {
        return
      }

      callback(unwrappedClerk as unknown as LoadedClerk)
      stop()
    },
    { immediate: true },
  )
}
