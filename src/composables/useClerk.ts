import type { LoadedClerk } from '@clerk/types'
import { useClerkProvide } from '../plugin'

export function useClerk(): LoadedClerk {
  const { clerk } = useClerkProvide()

  // The actual value is an instance of IsomorphicClerk, not Clerk
  // we expose is as a Clerk instance
  return clerk as unknown as LoadedClerk
}
