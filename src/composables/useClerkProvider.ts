import { inject } from 'vue'
import type { VueClerkInjectionKeyType } from '../keys'
import { VueClerkInjectionKey } from '../keys'

export function useClerkProvider() {
  const ctx = inject<VueClerkInjectionKeyType>(VueClerkInjectionKey)

  if (!ctx) {
    throw new Error(
      'This composable can only be used when the Vue Clerk plugin is installed. Learn more: https://vue-clerk.vercel.app/plugin',
    )
  }

  return ctx
}

/**
 * @deprecated use `useClerkProvider()` instead
 */
export const useClerkProvide = useClerkProvider
