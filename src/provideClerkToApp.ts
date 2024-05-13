import type { Clerk } from '@clerk/clerk-js'
import type { ActJWTClaim, ActiveSessionResource, ClerkOptions, ClientResource, DomainOrProxyUrl, InitialState, OrganizationCustomPermissionKey, OrganizationCustomRoleKey, OrganizationResource, Resources, UserResource } from '@clerk/types'
import { computed, reactive } from 'vue'
import type { App, ComputedRef, Ref } from 'vue'
import { deriveState } from './utils'

export type VueClerkOptions = ClerkOptions & {
  /**
   * @internal
   */
  Clerk?: Clerk
  publishableKey: string
  domain?: Pick<DomainOrProxyUrl, 'domain'>
  initialState?: InitialState
}

export interface VueClerkInjectionKey {
  clerk: Clerk
  /**
   * @deprecated Will be removed in the next release.
   */
  state: Resources
  isClerkLoaded: Ref<boolean>
  /**
   * @deprecated Will be removed in the next release.
   */
  derivedState: ComputedRef<ReturnType<typeof deriveState>>
  authCtx: ComputedRef<{
    userId: string | null | undefined
    sessionId: string | null | undefined
    actor: ActJWTClaim | null | undefined
    orgId: string | null | undefined
    orgRole: OrganizationCustomRoleKey | null | undefined
    orgSlug: string | null | undefined
    orgPermissions: OrganizationCustomPermissionKey[] | null | undefined
  }>
  clientCtx: ComputedRef<ClientResource | null | undefined>
  sessionCtx: ComputedRef<ActiveSessionResource | null | undefined>
  userCtx: ComputedRef<UserResource | null | undefined>
  organizationCtx: ComputedRef<OrganizationResource | null | undefined>
}

/**
 * @internal
 */
export function provideClerkToApp(app: App, clerk: Clerk, options: {
  /**
   * A Vue ref that be provided throughout the app to check if ClerkJS has been loaded.
   */
  isClerkLoaded: Ref<boolean>
  /**
   * Whether to initialize ClerkJS. See https://clerk.com/docs/quickstarts/javascript#initialize-clerk-js.
   */
  shouldLoadClerk?: boolean
  /**
   * ClerkJS load options. See https://clerk.com/docs/references/javascript/clerk/clerk#load.
   */
  clerkOptions: ClerkOptions
  initialState?: InitialState
}) {
  const state = reactive<Resources>({
    client: clerk.client as ClientResource,
    session: clerk.session,
    user: clerk.user,
    organization: clerk.organization,
  })

  const { isClerkLoaded, shouldLoadClerk, clerkOptions, initialState } = options

  if (shouldLoadClerk) {
    clerk?.load(clerkOptions)
      .then(() => {
        isClerkLoaded.value = true
      }).catch(() => {})
  }

  clerk?.addListener((payload) => {
    for (const [key, value] of Object.entries(payload))
      state[key as keyof typeof state] = value
  })

  const derivedState = computed(() => deriveState(isClerkLoaded.value, state as Resources, initialState))

  const authCtx = computed(() => {
    const { sessionId, userId, orgId, actor, orgRole, orgSlug, orgPermissions } = derivedState.value
    return { sessionId, userId, actor, orgId, orgRole, orgSlug, orgPermissions }
  })
  const clientCtx = computed(() => state.client)
  const userCtx = computed(() => derivedState.value.user)
  const sessionCtx = computed(() => derivedState.value.session)
  const organizationCtx = computed(() => derivedState.value.organization)

  app.config.globalProperties.$clerk = clerk

  app.provide<VueClerkInjectionKey>('VUE_CLERK', {
    clerk,
    state,
    isClerkLoaded,
    derivedState,
    authCtx,
    clientCtx,
    sessionCtx,
    userCtx,
    organizationCtx,
  })
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $clerk: Clerk
  }
}
