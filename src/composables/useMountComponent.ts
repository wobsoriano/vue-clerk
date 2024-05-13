import type { Ref } from 'vue'
import { onMounted, ref, watchEffect } from 'vue'
import { useClerkProvider } from './useClerkProvider'

/**
 * @param root0
 * @param root0.el
 * @param root0.mountFn
 * @param root0.unmountFn
 * @param root0.props
 * @internal
 * Makes sure that Clerk is loaded before mounting components.
 */
export function useMountComponent({
  el,
  mountFn,
  unmountFn,
  props,
}: {
  el: Ref<HTMLDivElement | null>
  mountFn: (...args: any) => void
  unmountFn: (...args: any) => void
  props: Record<string, any>
}) {
  const { isClerkLoaded } = useClerkProvider()
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  watchEffect((onInvalidate) => {
    if (!isMounted.value)
      return

    if (el.value && isClerkLoaded.value)
      mountFn(el.value, props)

    onInvalidate(() => {
      if (el.value)
        unmountFn(el.value)
    })
  })
}
