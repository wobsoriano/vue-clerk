import type { ActiveSessionResource } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvide } from './useClerkProvide'

type UseSessionReturn =
  | { isLoaded: false, isSignedIn: undefined, session: undefined }
  | { isLoaded: true, isSignedIn: false, session: null }
  | { isLoaded: true, isSignedIn: true, session: ActiveSessionResource }

export function useSession(): ToComputedRefs<UseSessionReturn> {
  const { derivedState } = useClerkProvide()

  const result = computed<UseSessionReturn>(() => {
    const { session } = derivedState.value

    if (session === undefined)
      return { isLoaded: false, isSignedIn: undefined, session: undefined }

    if (session === null)
      return { isLoaded: true, isSignedIn: false, session: null }

    return { isLoaded: true, isSignedIn: true, session }
  })

  return toComputedRefs(result)
}
