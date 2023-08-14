import Clerk from '@clerk/clerk-js'
import type { ClientResource, Resources } from '@clerk/types'
import { computed, inject, reactive, ref } from 'vue'
import type { ComputedRef, InjectionKey, Plugin, Ref } from 'vue'
import { deriveState } from './utils'

export const ClerkProvideSymbol = Symbol('CLERK_PROVIDER') as InjectionKey<{
  clerk: Clerk
  state: Resources
  isClerkLoaded: Ref<boolean>
  derivedState: ComputedRef<ReturnType<typeof deriveState>>
}>

export const clerkPlugin: Plugin = {
  install(app, { publishableKey, options }) {
    const clerk = new Clerk(publishableKey, options)

    const isClerkLoaded = ref(false)
    const state = reactive<Resources>({
      client: {} as ClientResource,
      user: clerk.client as any,
      session: clerk.session,
      organization: clerk.organization,
      lastOrganizationInvitation: null,
      lastOrganizationMember: null,
    })

    clerk?.load()
      .then(() => {
        isClerkLoaded.value = true

        clerk?.addListener((payload) => {
          for (const [key, value] of Object.entries(payload))
            state[key as keyof typeof state] = value
        })
      }).catch(() => {})

    const derivedState = computed(() => deriveState(isClerkLoaded.value, state as Resources, undefined))

    app.provide(ClerkProvideSymbol, {
      clerk,
      state,
      isClerkLoaded,
      derivedState,
    })
  },
}

export function useClerkProvide() {
  const clerk = inject(ClerkProvideSymbol)

  if (!clerk)
    throw new Error('Clerk provider not found')

  return clerk
}
