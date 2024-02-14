import type { SessionResource, SetActive, SetSession } from '@clerk/types'
import { computed } from 'vue'

import { toComputedRefs } from '../utils'
import { useClerkProvide } from './useClerkProvide'

type UseSessionListReturn =
  | { isLoaded: false, sessions: undefined, setSession: undefined, setActive: undefined }
  | { isLoaded: true, sessions: SessionResource[], setSession: SetSession, setActive: SetActive }

export function useSessionList() {
  const { clerk, state, isClerkLoaded } = useClerkProvide()

  const result = computed<UseSessionListReturn>(() => {
    if (!isClerkLoaded.value || !state.client)
      return { isLoaded: false, sessions: undefined, setSession: undefined, setActive: undefined }

    return {
      isLoaded: true,
      sessions: state.client.sessions,
      setSession: clerk.setSession,
      setActive: clerk.setActive,
    }
  })

  return toComputedRefs(result)
}
