import type { AuthObject } from 'h3-clerk'
import type { AsyncData } from 'nuxt/app'
import { useFetch } from '#imports'

export function useCurrentUser(): Promise<AsyncData<AuthObject | null, Error>> {
  // @ts-expect-error: Todo fix types
  return useFetch('/api/_clerk/current-user')
}
