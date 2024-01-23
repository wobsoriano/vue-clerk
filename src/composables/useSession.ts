import type { ActiveSessionResource } from '@clerk/types'
import { toRefs } from '@vueuse/core'
import { computed } from 'vue'
import { useClerkProvide } from './useClerkProvide'

type UseSessionReturn =
  | { isLoaded: false, isSignedIn: undefined, session: undefined }
  | { isLoaded: true, isSignedIn: false, session: null }
  | { isLoaded: true, isSignedIn: true, session: ActiveSessionResource }

export function useSession() {
  const { derivedState } = useClerkProvide()

  const result = computed<UseSessionReturn>(() => {
    const { session } = derivedState.value

    if (session === undefined)
      return { isLoaded: false, isSignedIn: undefined, session: undefined }

    if (session === null)
      return { isLoaded: true, isSignedIn: false, session: null }

    return { isLoaded: true, isSignedIn: true, session }
  })

  return toRefs(result)
}
