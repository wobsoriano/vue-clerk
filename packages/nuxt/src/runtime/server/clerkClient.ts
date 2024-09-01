import { createClerkClient } from '@clerk/backend'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

export function clerkClient(event: H3Event) {
  const runtimeConfig = useRuntimeConfig(event)
  const {
    publishableKey = runtimeConfig.public.clerk.publishableKey,
    apiUrl = runtimeConfig.public.clerk.apiUrl,
    apiVersion = runtimeConfig.public.clerk.apiVersion,
    secretKey = runtimeConfig.clerk.secretKey,
    jwtKey = runtimeConfig.clerk.jwtKey,
    // telemetryDebug = runtimeConfig.public.clerk.telemetryDebug,
    // telemetryDisabled = runtimeConfig.public.clerk.telemetryDisabled,
  } = runtimeConfig.clerk as Record<string, string>

  return createClerkClient({
    publishableKey,
    secretKey,
    apiUrl,
    apiVersion,
    jwtKey,
    // telemetry: {
    //   disabled: telemetryDisabled as unknown as boolean,
    //   debug: telemetryDebug as unknown as boolean,
    // },
  })
}

export function getAuth(event: H3Event) {
  return event.context.auth
}
