import { useAuth } from 'vue-clerk'
import type { CheckAuthorizationWithCustomPermissions } from '@clerk/types'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const { userId, has } = useAuth()
  const { condition, permission, role, guestRedirectUrl = '/' } = to.meta?.auth || {}

  if ((permission || role) && !has.value?.({ permission, role } as Parameters<CheckAuthorizationWithCustomPermissions>[0])) {
    return navigateTo(guestRedirectUrl)
  }

  if (typeof condition === 'function' && !condition(has.value!)) {
    return navigateTo(guestRedirectUrl)
  }

  if (!userId.value) {
    return navigateTo(guestRedirectUrl)
  }
})
