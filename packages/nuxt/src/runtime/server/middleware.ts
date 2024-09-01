import { withClerkMiddleware } from 'h3-clerk'
import { useRuntimeConfig } from '#app'

const runtimeConfig = useRuntimeConfig()

export default withClerkMiddleware(runtimeConfig.clerk!)
