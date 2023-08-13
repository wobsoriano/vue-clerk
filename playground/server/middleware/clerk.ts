import { withClerkMiddleware } from 'h3-clerk'

export default withClerkMiddleware({
  publishableKey: useRuntimeConfig().public.clerkPublishableKey,
  secretKey: useRuntimeConfig().clerkSecretKey,
})
