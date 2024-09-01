import { addComponent, addImports, addPlugin, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { IsomorphicClerkOptions } from 'vue-clerk'

export type ModuleOptions = IsomorphicClerkOptions

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-clerk',
    configKey: 'clerk',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    publishableKey: undefined,
    domain: undefined,
    isSatellite: undefined,
    proxyUrl: undefined,
    signInUrl: undefined,
    signUpUrl: undefined,
    afterSignInUrl: undefined,
    afterSignUpUrl: undefined,
    clerkJSUrl: undefined,
    clerkJSVariant: undefined,
    clerkJSVersion: undefined,
  },
  async setup(options, nuxt) {
    const runtimeConfig = nuxt.options.runtimeConfig
    const publicClerkVars = defu(runtimeConfig.public.clerk, options)
    runtimeConfig.public.clerk = publicClerkVars
    runtimeConfig.clerk = defu(runtimeConfig.clerk || {}, {
      secretKey: undefined,
      publishableKey: publicClerkVars.publishableKey,
      domain: publicClerkVars.domain,
      isSatellite: publicClerkVars.isSatellite,
      proxyUrl: publicClerkVars.proxyUrl,
      signInUrl: publicClerkVars.signInUrl,
      signUpUrl: publicClerkVars.signUpUrl,
      afterSignInUrl: publicClerkVars.afterSignInUrl,
      afterSignUpUrl: publicClerkVars.afterSignUpUrl,
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

    if (nuxt.options.nitro.imports !== false) {
      nuxt.options.nitro.imports = defu(nuxt.options.nitro.imports, {
        presets: [
          {
            from: 'h3-clerk',
            imports: ['clerkClient', 'getAuth'],
          },
        ],
      })
    }

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
