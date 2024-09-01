import { addComponent, addImports, addPlugin, addServerHandler, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { IsomorphicClerkOptions } from 'vue-clerk'

export type ModuleOptions = Omit<IsomorphicClerkOptions, 'routerPush' | 'routerReplace'>

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-clerk',
    configKey: 'clerk',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  async setup(options, nuxt) {
    const runtimeConfig = nuxt.options.runtimeConfig
    const publicClerk = defu(runtimeConfig.public.clerk, {
      ...options,
      publishableKey: options.publishableKey,
      signInUrl: options.signInUrl,
      signUpUrl: options.signUpUrl,
      isSatellite: options.isSatellite,
      proxyUrl: options.proxyUrl,
      domain: options.domain,
      clerkJSUrl: options.clerkJSUrl,
      clerkJSVariant: options.clerkJSVariant,
      clerkJSVersion: options.clerkJSVersion,
      apiUrl: undefined,
      apiVersion: undefined,
    })
    runtimeConfig.public.clerk = publicClerk as any
    runtimeConfig.clerk = defu(runtimeConfig.clerk, {
      secretKey: undefined,
      jwtKey: undefined,
    })

    nuxt.options.build.transpile.push('vue-clerk')

    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugins/clerk'))

    addServerHandler({
      middleware: true,
      handler: resolver.resolve('./runtime/server/middleware'),
    })
    addServerHandler({
      route: '/api/_clerk/current-user',
      handler: resolver.resolve('./runtime/server/api/current-user.get'),
      method: 'get',
    })

    nuxt.options.alias['#clerk'] = resolver.resolve('./runtime/server/clerkClient')
    nuxt.options.build.transpile.push(resolver.resolve('./runtime/server/clerkClient'))

    addTypeTemplate({
      filename: 'types/clerk.d.ts',
      write: true,
      getContents: () => [
        'declare module \'#clerk\' {',
        `  const clerkClient: typeof import('${resolver.resolve('./runtime/server/clerkClient')}').clerkClient`,
        `  const getAuth: typeof import('${resolver.resolve('./runtime/server/clerkClient')}').getAuth`,
        '}',
      ].join('\n'),
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
  },
})
