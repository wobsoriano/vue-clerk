import type { SessionResource, SetActive, SetSession } from '@clerk/types'
import { computed } from 'vue'

import { toRefs } from '@vueuse/core'
import { useClerkProvide } from './useClerkProvide'

type UseSessionListReturn =
  | { isLoaded: false; sessions: undefined; setSession: undefined; setActive: undefined }
  | { isLoaded: true; sessions: SessionResource[]; setSession: SetSession; setActive: SetActive }

export function useSessionList() {
  const { clerk, isClerkLoaded } = useClerkProvide()
  return toRefs(computed<UseSessionListReturn>(() => {
    if (!isClerkLoaded.value || !clerk.client)
      return { isLoaded: false, sessions: undefined, setSession: undefined, setActive: undefined }

    return {
      isLoaded: true,
      sessions: clerk.client.sessions,
      setSession: clerk.setSession,
      setActive: clerk.setActive,
    }
  }))
}
