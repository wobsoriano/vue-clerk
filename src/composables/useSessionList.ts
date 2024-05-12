import type { SessionResource, SetActive } from '@clerk/types'
import { computed } from 'vue'

import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvide } from './useClerkProvide'

type UseSessionListReturn =
  | { isLoaded: false, sessions: undefined, setActive: undefined }
  | { isLoaded: true, sessions: SessionResource[], setActive: SetActive }

export function useSessionList(): ToComputedRefs<UseSessionListReturn> {
  const { clerk, state, isClerkLoaded } = useClerkProvide()

  const result = computed<UseSessionListReturn>(() => {
    if (!isClerkLoaded.value || !state.client)
      return { isLoaded: false, sessions: undefined, setSession: undefined, setActive: undefined }

    return {
      isLoaded: true,
      sessions: state.client.sessions,
      setActive: clerk.setActive,
    }
  })

  return toComputedRefs(result)
}
