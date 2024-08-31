import type { User } from '@clerk/backend'
// @ts-expect-error: Nuxt imports
import { useState } from '#imports'

export const useCurrentUser = () => useState<User | null>('clerk-current-user', () => null)
