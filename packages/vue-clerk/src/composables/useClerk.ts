import { useClerkProvider } from './useClerkProvider'

export function useClerk() {
  const { clerk } = useClerkProvider()

  return clerk
}

export {
  useClerkProvider,
}
