import type { SetActive, SignInResource } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvide } from './useClerkProvide'

type UseSignInReturn =
  | { isLoaded: false, signIn: undefined, setActive: undefined }
  | { isLoaded: true, signIn: SignInResource, setActive: SetActive }

export function useSignIn(): ToComputedRefs<UseSignInReturn> {
  const { clerk, isClerkLoaded } = useClerkProvide()

  const result = computed<UseSignInReturn>(() => {
    if (!isClerkLoaded.value || !clerk.client)
      return { isLoaded: false, signIn: undefined, setActive: undefined }

    return {
      isLoaded: true,
      signIn: clerk.client.signIn,
      setActive: clerk.setActive,
    }
  })

  return toComputedRefs(result)
}
