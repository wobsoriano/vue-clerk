import { createClerkClient } from '@clerk/backend'
import type { H3Event } from 'h3'
import { isTruthy } from './utils'
import { useRuntimeConfig } from '#imports'

export function clerkClient(event: H3Event) {
  const runtimeConfig = useRuntimeConfig(event)
  return createClerkClient({
    publishableKey: runtimeConfig.public.clerk.publishableKey,
    apiUrl: runtimeConfig.public.clerk.apiUrl,
    apiVersion: runtimeConfig.public.clerk.apiVersion,
    secretKey: runtimeConfig.clerk.secretKey,
    jwtKey: runtimeConfig.clerk.jwtKey,
    telemetry: {
      disabled: isTruthy(runtimeConfig.public.clerk.telemetry?.disabled),
      debug: isTruthy(runtimeConfig.public.clerk.telemetry?.debug),
    },
  })
}

export function getAuth(event: H3Event) {
  return event.context.auth
}
