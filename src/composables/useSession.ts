import type { ActiveSessionResource } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvider } from './useClerkProvider'

type UseSessionReturn =
  | { isLoaded: false, isSignedIn: undefined, session: undefined }
  | { isLoaded: true, isSignedIn: false, session: null }
  | { isLoaded: true, isSignedIn: true, session: ActiveSessionResource }

export function useSession(): ToComputedRefs<UseSessionReturn> {
  const { sessionCtx } = useClerkProvider()

  const result = computed<UseSessionReturn>(() => {
    if (sessionCtx.value === undefined)
      return { isLoaded: false, isSignedIn: undefined, session: undefined }

    if (sessionCtx.value === null)
      return { isLoaded: true, isSignedIn: false, session: null }

    return { isLoaded: true, isSignedIn: true, session: sessionCtx.value }
  })

  return toComputedRefs(result)
}
