import { useAuth } from 'vue-clerk'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const { userId } = useAuth()

  if (!userId.value) {
    return
  }

  const route = to?.meta?.auth?.redirectUrl ?? '/'

  return navigateTo(route)
})
