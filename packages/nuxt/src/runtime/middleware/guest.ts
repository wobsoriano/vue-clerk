import { useAuth } from 'vue-clerk'
import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const { userId } = useAuth()

  if (!userId.value) {
    return
  }

  const route = to?.meta?.auth?.authenticatedRedirectUrl ?? (useRuntimeConfig().public.clerk.signInForceRedirectUrl || useRuntimeConfig().public.clerk.signInFallbackRedirectUrl) ?? '/'

  return navigateTo(route)
})
