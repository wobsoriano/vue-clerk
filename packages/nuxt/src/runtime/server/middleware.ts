import { withClerkMiddleware } from 'h3-clerk'
// @ts-expect-error: Nuxt imports
import { useRuntimeConfig } from '#app'

const publishableKey = useRuntimeConfig().public.clerk.publishableKey

export default withClerkMiddleware({
  publishableKey,
})
