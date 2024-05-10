import type { Clerk } from '@clerk/clerk-js'
import type { ClerkOptions, ClientResource, DomainOrProxyUrl, Resources } from '@clerk/types'
import { computed, reactive, ref } from 'vue'
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

function initializeState(clerk: Clerk) {
  return reactive<Resources>({
    client: {} as ClientResource,
    user: clerk.client as any,
    session: clerk.session,
    organization: clerk.organization,
  })
}

function provideClerkToApp(app: App, clerk: Clerk, state: Resources, isClerkLoaded: Ref<boolean>) {
  const derivedState = computed(() => deriveState(isClerkLoaded.value, state as Resources, undefined))

  app.config.globalProperties.$clerk = clerk

  app.provide<VueClerkInjectionKey>('VUE_CLERK', {
    clerk,
    state,
    isClerkLoaded,
    derivedState,
  })
}

/**
 * @internal
 */
export function createClerkInstance(app: App, clerk: Clerk, options: ClerkOptions) {
  const isClerkLoaded = ref(false)
  const state = initializeState(clerk)

  clerk?.load(options)
    .then(() => {
      isClerkLoaded.value = true
    }).catch(() => {})

  clerk?.addListener((payload) => {
    for (const [key, value] of Object.entries(payload))
      state[key as keyof typeof state] = value
  })

  provideClerkToApp(app, clerk, state, isClerkLoaded)
}

/**
 * @internal
 */
export function createClerkInstanceWithoutLoading(app: App, clerk: Clerk, isClerkLoaded: Ref<boolean>) {
  const state = initializeState(clerk)

  clerk?.addListener((payload) => {
    for (const [key, value] of Object.entries(payload))
      state[key as keyof typeof state] = value
  })

  provideClerkToApp(app, clerk, state, isClerkLoaded)
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $clerk: Clerk
  }
}
