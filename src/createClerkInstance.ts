import type Clerk from '@clerk/clerk-js'
import type { ClerkOptions, ClientResource, DomainOrProxyUrl, Resources } from '@clerk/types'
import { computed, reactive, ref } from 'vue'
import type { App, ComputedRef, Ref } from 'vue'
import { deriveState } from './utils'

export interface VueClerkOptions extends ClerkOptions {
  publishableKey: string
  domain?: Pick<DomainOrProxyUrl, 'domain'>
  /**
   * @deprecated Pass the options directly to the plugin options. See https://vue-clerk.vercel.app/plugin.
   */
  options?: ClerkOptions
  /**
   * @deprecated Pass the options directly to the plugin options. See https://vue-clerk.vercel.app/plugin.
   */
  instanceOptions?: DomainOrProxyUrl
}

export interface VueClerkInjectionKey {
  clerk: Clerk
  state: Resources
  isClerkLoaded: Ref<boolean>
  derivedState: ComputedRef<ReturnType<typeof deriveState>>
}

export function createClerkInstance(
  app: App,
  clerk: Clerk,
  options: ClerkOptions,
) {
  // @ts-expect-error: This will be deprecated in the next version.
  if (options.options || options.instanceOptions)
    console.warn('The options and instanceOptions properties are deprecated. Pass the options directly to the plugin options. See https://vue-clerk.vercel.app/plugin.')

  const isClerkLoaded = ref(false)
  const state = reactive<Resources>({
    client: {} as ClientResource,
    user: clerk.client as any,
    session: clerk.session,
    organization: clerk.organization,
    lastOrganizationInvitation: null,
    lastOrganizationMember: null,
  })

  clerk?.load(options)
    .then(() => {
      isClerkLoaded.value = true

      clerk?.addListener((payload) => {
        for (const [key, value] of Object.entries(payload))
          state[key as keyof typeof state] = value
      })
    }).catch(() => {})

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
