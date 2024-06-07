import { computed, defineComponent, onMounted } from 'vue'
import type { CheckAuthorizationWithCustomPermissions, HandleOAuthCallbackParams, OrganizationCustomPermissionKey, OrganizationCustomRoleKey, RedirectOptions } from '@clerk/types'
import { useAuth } from './composables/useAuth'
import { useClerkProvider } from './composables/useClerkProvider'
import { useClerk } from './composables/useClerk'

export const SignedIn = defineComponent({
  setup(_props, { slots }) {
    const { userId } = useAuth()

    return () => userId.value ? slots.default?.() : null
  },
})

export const SignedOut = defineComponent({
  setup(_props, { slots }) {
    const { userId } = useAuth()

    return () => userId.value === null ? slots.default?.() : null
  },
})

export const ClerkLoaded = defineComponent({
  setup(_props, { slots }) {
    const { isClerkLoaded } = useClerkProvider()

    return () => isClerkLoaded.value ? slots.default?.() : null
  },
})

export const ClerkLoading = defineComponent({
  setup(_props, { slots }) {
    const { isClerkLoaded } = useClerkProvider()

    return () => !isClerkLoaded.value ? slots.default?.() : null
  },
})

export const RedirectToSignIn = defineComponent((props: RedirectOptions) => {
  const { sessionCtx, clientCtx } = useClerkProvider()
  const clerk = useClerk()

  const hasActiveSessions = computed(() => clientCtx.value?.activeSessions && clientCtx.value.activeSessions.length > 0)

  onMounted(() => {
    if (sessionCtx.value === null && hasActiveSessions.value)
      void clerk.redirectToAfterSignOut()
    else
      void clerk.redirectToSignIn(props)
  })

  return () => null
})

export const RedirectToSignUp = defineComponent((props: RedirectOptions) => {
  const clerk = useClerk()

  onMounted(() => {
    void clerk.redirectToSignUp(props)
  })

  return () => null
})

export const RedirectToUserProfile = defineComponent(() => {
  const clerk = useClerk()

  onMounted(() => {
    void clerk.redirectToUserProfile()
  })

  return () => null
})

export const RedirectToOrganizationProfile = defineComponent(() => {
  const clerk = useClerk()

  onMounted(() => {
    void clerk.redirectToOrganizationProfile()
  })

  return () => null
})

export const RedirectToCreateOrganization = defineComponent(() => {
  const clerk = useClerk()

  onMounted(() => {
    void clerk.redirectToCreateOrganization()
  })

  return () => null
})

export const AuthenticateWithRedirectCallback = defineComponent((props: HandleOAuthCallbackParams) => {
  const clerk = useClerk()

  onMounted(() => {
    void clerk.handleRedirectCallback(props)
  })

  return () => null
})

export type ProtectProps = {
  condition?: never
  role: OrganizationCustomRoleKey
  permission?: never
} | {
  condition?: never
  role?: never
  permission: OrganizationCustomPermissionKey
} | {
  condition: (has: CheckAuthorizationWithCustomPermissions) => boolean
  role?: never
  permission?: never
} | {
  condition?: never
  role?: never
  permission?: never
}

export const Protect = defineComponent((props: ProtectProps, { slots }) => {
  const { isLoaded, has, userId } = useAuth()

  return () => {
    /**
     * Avoid flickering children or fallback while clerk is loading sessionId or userId
     */
    if (!isLoaded.value)
      return null

    /**
     * Fallback to UI provided by user or `null` if authorization checks failed
     */
    if (!userId.value)
      return slots.fallback?.()

    /**
     * Check against the results of `has` called inside the callback
     */
    if (typeof props.condition === 'function') {
      if (props.condition(has.value!))
        return slots.default?.()

      return slots.fallback?.()
    }

    if (props.role || props.permission) {
      if (has.value?.(props))
        return slots.default?.()

      return slots.fallback?.()
    }

    /**
     * If neither of the authorization params are passed behave as the `<SignedIn/>`.
     * If fallback is present render that instead of rendering nothing.
     */
    return slots.default?.()
  }
}, {
  props: ['condition', 'role', 'permission'],
})
