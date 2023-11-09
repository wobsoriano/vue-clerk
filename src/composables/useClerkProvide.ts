import { inject } from "vue"
import { VueClerkInjectionKey } from "../createClerkInstance"

export function useClerkProvide() {
  const clerk = inject<VueClerkInjectionKey>('VUE_CLERK')

  if (!clerk)
    throw new Error('Clerk provider not found')

  return clerk
}
