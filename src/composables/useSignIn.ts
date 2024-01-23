import type { SetActive, SetSession, SignInResource } from '@clerk/types'
import { toRefs } from '@vueuse/core'
import { computed } from 'vue'
import { useClerkProvide } from './useClerkProvide'

type UseSignInReturn =
  | { isLoaded: false, signIn: undefined, setSession: undefined, setActive: undefined }
  | { isLoaded: true, signIn: SignInResource, setSession: SetSession, setActive: SetActive }

export function useSignIn() {
  const { clerk, isClerkLoaded } = useClerkProvide()

  const result = computed<UseSignInReturn>(() => {
    if (!isClerkLoaded.value || !clerk.client)
      return { isLoaded: false, signIn: undefined, setSession: undefined, setActive: undefined }

    return {
      isLoaded: true,
      signIn: clerk.client.signIn,
      setSession: clerk.setSession,
      setActive: clerk.setActive,
    }
  })

  return toRefs(result)
}
