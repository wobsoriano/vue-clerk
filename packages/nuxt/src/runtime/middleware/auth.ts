import { useAuth } from 'vue-clerk'
import type { CheckAuthorizationWithCustomPermissions } from '@clerk/types'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const { userId, has } = useAuth()
  const { condition, permission, role, navigateUnauthenticatedTo, guestRedirectUrl } = to.meta?.auth || {}
  const redirectUrl = navigateUnauthenticatedTo || guestRedirectUrl

  if ((permission || role) && !has.value?.({ permission, role } as Parameters<CheckAuthorizationWithCustomPermissions>[0])) {
    return navigateTo(redirectUrl)
  }

  if (typeof condition === 'function' && !condition(has.value!)) {
    return navigateTo(redirectUrl)
  }

  if (!userId.value) {
    return navigateTo(redirectUrl)
  }
})
