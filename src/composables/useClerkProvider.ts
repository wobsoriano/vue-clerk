import { inject } from 'vue'
import type { VueClerkInjectionKey } from '../provideClerkToApp'

export function useClerkProvider() {
  const clerk = inject<VueClerkInjectionKey>('VUE_CLERK')

  if (!clerk)
    throw new Error('Clerk provider not found')

  return clerk
}

/**
 * @deprecated use useClerkProvider instead
 */
export const useClerkProvide = useClerkProvider
