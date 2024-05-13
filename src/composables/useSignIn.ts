import type { SetActive, SignInResource } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvider } from './useClerkProvider'

type UseSignInReturn =
  | { isLoaded: false, signIn: undefined, setActive: undefined }
  | { isLoaded: true, signIn: SignInResource, setActive: SetActive }

export function useSignIn(): ToComputedRefs<UseSignInReturn> {
  const { clerk, clientCtx } = useClerkProvider()

  const result = computed<UseSignInReturn>(() => {
    if (!clientCtx.value)
      return { isLoaded: false, signIn: undefined, setActive: undefined }

    return {
      isLoaded: true,
      signIn: clientCtx.value.signIn,
      setActive: clerk.setActive,
    }
  })

  return toComputedRefs(result)
}
