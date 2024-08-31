import { ref } from 'vue'

export function usePolymorphicRef() {
  const node = ref<HTMLElement | null>(null)
  const setRef = (value: HTMLElement | null) => (node.value = value)

  return {
    node,
    setRef,
  }
}
