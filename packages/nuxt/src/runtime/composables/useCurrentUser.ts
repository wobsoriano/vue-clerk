import type { AuthObject } from 'h3-clerk'
import type { AsyncData } from 'nuxt/app'
import { useFetch } from '#imports'

export function useCurrentUser(): AsyncData<AuthObject | null, Error | null> {
  return useFetch('/api/_clerk/current-user')
}
