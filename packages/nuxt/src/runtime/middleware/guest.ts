import { useAuth } from 'vue-clerk'
import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const { userId } = useAuth()

  // If user is not authenticated, no need to redirect
  if (!userId.value) {
    return
  }

  // Get config values
  const config = useRuntimeConfig().public.clerk

  // Chain of fallbacks for redirect URL
  const redirectUrl = to.meta.auth?.navigateAuthenticatedTo
    || to.meta.auth?.authenticatedRedirectUrl
    || config.signInForceRedirectUrl
    || config.signInFallbackRedirectUrl

  return navigateTo(redirectUrl)
})
