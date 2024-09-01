import { withClerkMiddleware } from 'h3-clerk'
import { useRuntimeConfig } from '#imports'

const runtimeConfig = useRuntimeConfig()

export default withClerkMiddleware(runtimeConfig.clerk!)
