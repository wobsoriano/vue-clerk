import { addComponent, addImports, addPlugin, addRouteMiddleware, addServerHandler, createResolver, defineNuxtModule, updateRuntimeConfig, useLogger } from '@nuxt/kit'
import type { IsomorphicClerkOptions } from 'vue-clerk'

export type ModuleOptions = Omit<IsomorphicClerkOptions, 'routerPush' | 'routerReplace'> & {
  /**
   *
   * Skip the automatic server middleware registration. When enabled, you'll need to
   * register the middleware manually in your application.
   *
   * @default false
   *
   * @example
   *
   * ```ts
   * // server/middleware/clerk.ts
   * import { clerkMiddleware } from 'vue-clerk/server'
   *
   * export default clerkMiddleware((event) => {
   *   console.log('auth', event.context.auth)
   * })
   * ```
   */
  skipServerMiddleware?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-clerk',
    configKey: 'clerk',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  async setup(options, nuxt) {
    const logger = useLogger('vue-clerk')

    updateRuntimeConfig({
      public: {
        clerk: {
          ...options,
          publishableKey: options.publishableKey,
          signInUrl: options.signInUrl,
          signInFallbackRedirectUrl: options.signInFallbackRedirectUrl,
          signUpFallbackRedirectUrl: options.signUpFallbackRedirectUrl,
          signInForceRedirectUrl: options.signInForceRedirectUrl,
          signUpForceRedirectUrl: options.signUpForceRedirectUrl,
          signUpUrl: options.signUpUrl,
          isSatellite: options.isSatellite,
          proxyUrl: options.proxyUrl,
          domain: options.domain,
          clerkJSUrl: options.clerkJSUrl,
          clerkJSVariant: options.clerkJSVariant,
          clerkJSVersion: options.clerkJSVersion,
          apiUrl: 'https://api.clerk.com',
          apiVersion: 'v1',
        },
      },
      clerk: {
        secretKey: undefined,
        jwtKey: undefined,
      },
    })

    const { getDeprecationMessage } = await import('vue-clerk/internal')
    logger.warn(getDeprecationMessage())

    const resolver = createResolver(import.meta.url)

    nuxt.options.build.transpile.push(resolver.resolve('./runtime'), 'vue-clerk/server')

    addPlugin(resolver.resolve('./runtime/plugins/clerk'))

    if (!options.skipServerMiddleware) {
      addServerHandler({
        middleware: true,
        handler: resolver.resolve('./runtime/server/middleware'),
      })
    }

    addServerHandler({
      route: '/api/_clerk/current-user',
      handler: resolver.resolve('./runtime/server/api/current-user.get'),
      method: 'get',
    })

    const components = [
      // Authentication Components
      'SignIn',
      'SignUp',
      // Unstyled Components
      'SignInButton',
      'SignOutButton',
      'SignUpButton',
      'SignInWithMetamaskButton',
      // User Components
      'UserButton',
      'UserProfile',
      // Organization Components
      'CreateOrganization',
      'OrganizationProfile',
      'OrganizationSwitcher',
      'OrganizationList',
      // Control Components
      'ClerkLoaded',
      'ClerkLoading',
      'Protect',
      'RedirectToSignIn',
      'RedirectToSignUp',
      'RedirectToUserProfile',
      'RedirectToOrganizationProfile',
      'RedirectToCreateOrganization',
      'SignedIn',
      'SignedOut',
    ]
    const composables = [
      'useAuth',
      'useClerk',
      'useSession',
      'useSessionList',
      'useSignIn',
      'useSignUp',
      'useUser',
      'useOrganization',
      // helpers
      'updateClerkOptions',
    ]

    addImports(
      composables.map(composable => ({
        name: composable,
        from: 'vue-clerk',
      })),
    )
    addImports({
      name: 'useCurrentUser',
      from: resolver.resolve('./runtime/composables/useCurrentUser'),
    })

    components.forEach(component =>
      addComponent({
        name: component,
        export: component,
        filePath: 'vue-clerk',
      }),
    )

    addRouteMiddleware({ name: 'clerk:auth', path: resolver.resolve('./runtime/middleware/auth') })
    addRouteMiddleware({ name: 'clerk:guest', path: resolver.resolve('./runtime/middleware/guest') })

    // Deprecated: Remove next minor release
    addRouteMiddleware({ name: 'auth', path: resolver.resolve('./runtime/middleware/auth') })
    addRouteMiddleware({ name: 'guest', path: resolver.resolve('./runtime/middleware/guest') })
  },
})
