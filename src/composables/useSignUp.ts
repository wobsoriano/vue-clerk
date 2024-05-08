import type { SetActive, SignUpResource } from '@clerk/types'
import { computed } from 'vue'
import { toComputedRefs } from '../utils'
import { useClerkProvide } from './useClerkProvide'

type UseSignUpReturn =
  | { isLoaded: false, signUp: undefined, setActive: undefined }
  | { isLoaded: true, signUp: SignUpResource, setActive: SetActive }

export function useSignUp() {
  const { clerk, isClerkLoaded } = useClerkProvide()

  const result = computed<UseSignUpReturn>(() => {
    if (!isClerkLoaded.value || !clerk.client)
      return { isLoaded: false, signUp: undefined, setActive: undefined }

    return {
      isLoaded: true,
      signUp: clerk.client.signUp,
      setActive: clerk.setActive,
    }
  })

  return toComputedRefs(result)
}
