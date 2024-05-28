import type { Clerk } from '@clerk/clerk-js'
import type { ClerkOptions, ClientResource, DomainOrProxyUrl, InitialState, Resources } from '@clerk/types'
import { computed, reactive } from 'vue'
import type { App, Ref } from 'vue'
import { deriveState } from './utils'
import type { VueClerkInjectionKeyType } from './keys'
import { VueClerkInjectionKey } from './keys'

export type VueClerkOptions = ClerkOptions & {
  /**
   * @internal
   */
  Clerk?: Clerk
  publishableKey: string
  domain?: Pick<DomainOrProxyUrl, 'domain'>
  initialState?: InitialState
}

// @deprecated Use provideClerkToVueApp instead
export const provideClerkToApp = provideClerkToVueApp

export function provideClerkToVueApp(app: App, clerk: Clerk, options: {
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
}): Clerk {
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

  app.provide<VueClerkInjectionKeyType>(VueClerkInjectionKey, {
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

  return clerk
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $clerk: Clerk
  }
}
