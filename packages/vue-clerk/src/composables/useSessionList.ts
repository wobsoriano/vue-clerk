import type { UseSessionListReturn } from '@clerk/types'
import { computed } from 'vue'

import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvider } from './useClerkProvider'

export function useSessionList(): ToComputedRefs<UseSessionListReturn> {
  const { clerk, clientCtx } = useClerkProvider()

  const result = computed<UseSessionListReturn>(() => {
    if (!clientCtx.value)
      return { isLoaded: false, sessions: undefined, setActive: undefined }

    return {
      isLoaded: true,
      sessions: clientCtx.value.sessions,
      setActive: clerk.setActive,
    }
  })

  return toComputedRefs(result)
}
