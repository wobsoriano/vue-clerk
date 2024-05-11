import { inject } from 'vue'
import type { VueClerkInjectionKey } from '../provideClerkToApp'

export function useClerkProvide() {
  const clerk = inject<VueClerkInjectionKey>('VUE_CLERK')

  if (!clerk)
    throw new Error('Clerk provider not found')

  return clerk
}
