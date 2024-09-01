import type { User } from '@clerk/backend'
import type { AsyncData } from 'nuxt/app'
import { useFetch } from '#imports'

export function useCurrentUser(): AsyncData<User | null, Error | null> {
  return useFetch('/api/_clerk/current-user')
}
