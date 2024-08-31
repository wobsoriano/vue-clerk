import { addComponent, addImports, addImportsDir, addPlugin, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { IsomorphicClerkOptions } from 'vue-clerk'

export type ModuleOptions = IsomorphicClerkOptions

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-clerk/nuxt',
    configKey: 'clerk',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.clerk = options
    nuxt.options.build.transpile.push('vue-clerk')

    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/composables'))

    addPlugin(resolver.resolve('./runtime/plugins/current-user.server'))
    addPlugin(resolver.resolve('./runtime/plugins/clerk'))

    addServerHandler({
      middleware: true,
      handler: resolver.resolve('./runtime/server/middleware'),
    })
    addServerHandler({
      handler: resolver.resolve('./runtime/server/api/current-user.get'),
      route: '/api/_clerk/current-user',
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
        as: composable,
        from: 'vue-clerk',
      })),
    )

    components.forEach(component =>
      addComponent({
        name: component,
        export: component,
        filePath: require.resolve('../index'),
      }),
    )
  },
})
