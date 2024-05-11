import type { Clerk } from '@clerk/clerk-js'
import type { ClerkOptions, ClientResource, DomainOrProxyUrl, Resources } from '@clerk/types'
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
}

export interface VueClerkInjectionKey {
  clerk: Clerk
  state: Resources
  isClerkLoaded: Ref<boolean>
  derivedState: ComputedRef<ReturnType<typeof deriveState>>
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
}) {
  const state = reactive<Resources>({
    client: {} as ClientResource,
    user: clerk.client as any,
    session: clerk.session,
    organization: clerk.organization,
  })

  const { isClerkLoaded, shouldLoadClerk, clerkOptions } = options

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

  const derivedState = computed(() => deriveState(isClerkLoaded.value, state as Resources, undefined))

  app.config.globalProperties.$clerk = clerk

  app.provide<VueClerkInjectionKey>('VUE_CLERK', {
    clerk,
    state,
    isClerkLoaded,
    derivedState,
  })
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $clerk: Clerk
  }
}
