import type { Ref } from 'vue'
import { watchPostEffect } from 'vue'
import type { LoadedClerk } from '@clerk/types'
import { useClerkProvide } from '../plugin'
import { useClerk } from './useClerk'

export function useMountComponent({
  el,
  mountKey,
  unmountKey,
  props,
}: {
  el: Ref<HTMLDivElement | null>
  mountKey: keyof Pick<LoadedClerk, 'mountSignIn' | 'mountSignUp' | 'mountUserProfile' | 'mountUserButton'>
  unmountKey: keyof Pick<LoadedClerk, 'unmountSignIn' | 'unmountSignUp' | 'unmountUserProfile' | 'unmountUserButton'>
  props: Record<string, any>
}) {
  const clerk = useClerk()
  const { isClerkLoaded } = useClerkProvide()

  watchPostEffect((onInvalidate) => {
    if (el.value && isClerkLoaded.value)
      clerk[mountKey](el.value, props)

    onInvalidate(() => {
      if (el.value)
        clerk[unmountKey](el.value)
    })
  })
}
