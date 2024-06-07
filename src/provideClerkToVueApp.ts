import type { Clerk, ClerkOptions, ClientResource, InitialState, Resources, Without } from '@clerk/types'
import { computed, reactive, ref } from 'vue'
import type { App } from 'vue'
import { isPublishableKey } from '@clerk/shared/keys'
import { deriveState } from './utils/index'
import { VueClerkInjectionKey } from './keys'
import { IsomorphicClerk } from './isomorphicClerk'
import type { IsomorphicClerkOptions } from './types'
import { errorThrower } from './errors/errorThrower'

export interface HeadlessBrowserClerk extends Clerk {
  load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>
  updateClient: (client: ClientResource) => void
}

export interface BrowserClerk extends HeadlessBrowserClerk {
  onComponentsReady: Promise<void>
  components: any
}

export function provideClerkToVueApp(app: App, options: IsomorphicClerkOptions & { initialState?: InitialState }): IsomorphicClerk {
  const { initialState, publishableKey, Clerk: userInitializedClerk } = options

  if (!userInitializedClerk) {
    if (!publishableKey)
      errorThrower.throwMissingPublishableKeyError()
    else if (publishableKey && !isPublishableKey(publishableKey))
      errorThrower.throwInvalidPublishableKeyError({ key: publishableKey })
  }

  const isClerkLoaded = ref(false)
  const clerk = new IsomorphicClerk(options)

  const state = reactive<Resources>({
    client: {} as ClientResource,
    session: undefined,
    user: undefined,
    organization: undefined,
  })

  clerk.addListener((payload) => {
    for (const [key, value] of Object.entries(payload))
      state[key as keyof typeof state] = value
  })

  clerk.addOnLoaded(() => {
    isClerkLoaded.value = true
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

  app.provide(VueClerkInjectionKey, {
    clerk,
    isClerkLoaded,
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
    $clerk: IsomorphicClerk
  }
}
