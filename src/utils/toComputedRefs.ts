import { type ComputedRef, computed } from 'vue'

export type ToComputedRefs<T = any> = {
  [K in keyof T]: ComputedRef<T[K]>;
}

export function toComputedRefs<T extends object>(
  objectRef: ComputedRef<T>,
): ToComputedRefs<T> {
  const result = {} as any

  for (const key in objectRef.value)
    result[key] = computed(() => objectRef.value[key])

  return result
}
