import type { SetActive, SetSession, SignUpResource } from '@clerk/types'
import { computed } from 'vue'
import { toRefs } from '@vueuse/core'
import { useClerkProvide } from '../plugin'

type UseSignUpReturn =
  | { isLoaded: false; signUp: undefined; setSession: undefined; setActive: undefined }
  | { isLoaded: true; signUp: SignUpResource; setSession: SetSession; setActive: SetActive }

export function useSignUp() {
  const { clerk, isClerkLoaded } = useClerkProvide()

  const result = computed<UseSignUpReturn>(() => {
    if (!isClerkLoaded.value || !clerk.client)
      return { isLoaded: false, signUp: undefined, setSession: undefined, setActive: undefined }

    return {
      isLoaded: true,
      signUp: clerk.client.signUp,
      setSession: clerk.setSession,
      setActive: clerk.setActive,
    }
  })

  return toRefs(result)
}
