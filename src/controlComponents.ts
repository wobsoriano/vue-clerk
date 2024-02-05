import { computed, defineComponent, onMounted } from 'vue'
import type { CheckAuthorizationWithCustomPermissions, HandleOAuthCallbackParams, OrganizationCustomPermissionKey, OrganizationCustomRoleKey, RedirectOptions } from '@clerk/types'
import { useAuth } from './composables/useAuth'
import { useClerkProvide } from './composables/useClerkProvide'

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
    const { isClerkLoaded } = useClerkProvide()

    return () => isClerkLoaded.value ? slots.default?.() : null
  },
})

export const ClerkLoading = defineComponent({
  setup(_props, { slots }) {
    const { isClerkLoaded } = useClerkProvide()

    return () => !isClerkLoaded.value ? slots.default?.() : null
  },
})

export const RedirectToSignIn = defineComponent(<T extends RedirectOptions>(props: T) => {
  const { clerk, state } = useClerkProvide()

  const hasActiveSessions = computed(() => state.client?.activeSessions && state.client.activeSessions.length > 0)

  // TODO: Remove temp use of __unstable__environment
  const { __unstable__environment } = clerk as any

  onMounted(() => {
    if (clerk.session === null && hasActiveSessions.value && __unstable__environment) {
      const { afterSignOutOneUrl } = __unstable__environment.displayConfig
      void clerk.navigate(afterSignOutOneUrl)
    }
    else {
      void clerk.redirectToSignIn(props)
    }
  })

  return () => null
})

export const RedirectToSignUp = defineComponent(<T extends RedirectOptions>(props: T) => {
  const { clerk } = useClerkProvide()

  onMounted(() => {
    void clerk.redirectToSignUp(props)
  })

  return () => null
})

export const RedirectToUserProfile = defineComponent(() => {
  const { clerk } = useClerkProvide()

  onMounted(() => {
    void clerk.redirectToUserProfile()
  })

  return () => null
})

export const AuthenticateWithRedirectCallback = defineComponent(<T extends HandleOAuthCallbackParams>(props: T) => {
  const { clerk } = useClerkProvide()

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
