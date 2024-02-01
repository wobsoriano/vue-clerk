import { computed, defineComponent, h, onMounted } from 'vue'
import type { CheckAuthorizationWithCustomPermissions, HandleOAuthCallbackParams, OrganizationCustomPermissionKey, OrganizationCustomRoleKey, RedirectOptions } from '@clerk/types'
import { useAuth } from './composables/useAuth'
import { useClerkProvide } from './composables/useClerkProvide'

export const SignedIn = defineComponent({
  setup(_props, { slots }) {
    const { userId } = useAuth()

    return () => userId.value ? slots?.default?.() : null
  },
})

export const SignedOut = defineComponent({
  setup(_props, { slots }) {
    const { userId } = useAuth()

    return () => userId.value === null ? slots?.default?.() : null
  },
})

export const ClerkLoaded = defineComponent({
  setup(_props, { slots }) {
    const { isClerkLoaded } = useClerkProvide()

    return () => isClerkLoaded.value ? slots?.default?.() : null
  },
})

export const ClerkLoading = defineComponent({
  setup(_props, { slots }) {
    const { isClerkLoaded } = useClerkProvide()

    return () => !isClerkLoaded.value ? slots?.default?.() : null
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

export const Protect = defineComponent(<T extends ProtectProps>(props: T, { slots }: any) => {
  const { isLoaded, has, userId } = useAuth()

  return () => {
    if (isLoaded.value) {
      if (!userId.value || (typeof props.condition === 'function' && props.condition(has.value!)) || (props.role || props.permission && has.value?.(props)))
        return slots.default ? slots.default() : null
      else
        return slots.fallback ? slots.fallback() : null
    }
    return null
  }
})
