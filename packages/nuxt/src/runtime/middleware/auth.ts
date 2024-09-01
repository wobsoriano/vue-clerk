import { useAuth } from 'vue-clerk'
import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const { userId } = useAuth()

  if (userId.value) {
    return
  }

  const route = to?.meta?.auth?.guestRedirectUrl ?? '/'

  return navigateTo(route)
})
