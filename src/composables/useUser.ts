import type { UserResource } from '@clerk/types'
import { computed } from 'vue'
import { toComputedRefs } from '../utils'
import { useClerkProvide } from './useClerkProvide'

type UseUserReturn =
  | { isLoaded: false, isSignedIn: undefined, user: undefined }
  | { isLoaded: true, isSignedIn: false, user: null }
  | { isLoaded: true, isSignedIn: true, user: UserResource }

export function useUser() {
  const { derivedState } = useClerkProvide()

  const result = computed<UseUserReturn>(() => {
    const { user } = derivedState.value

    if (user === undefined)
      return { isLoaded: false, isSignedIn: undefined, user: undefined }

    if (user === null)
      return { isLoaded: true, isSignedIn: false, user: null }

    return { isLoaded: true, isSignedIn: true, user }
  })

  return toComputedRefs(result)
}
