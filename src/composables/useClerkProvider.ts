import { inject } from 'vue'
import type { VueClerkInjectionKey } from '../provideClerkToApp'

export function useClerkProvider() {
  const ctx = inject<VueClerkInjectionKey>('VUE_CLERK')

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
