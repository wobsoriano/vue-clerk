import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Vue Clerk',
  description: 'Clerk composables and components for Vue',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [/^https?:\/\/localhost/],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: pkg.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/wobsoriano/vue-clerk/blob/main/CHANGELOG.md',
          },
        ],
      },
      { text: 'Sponsor', link: 'https://github.com/sponsors/wobsoriano' },
    ],

    editLink: {
      pattern: 'https://github.com/wobsoriano/vue-clerk/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      // copyright: 'Copyright © 2023-present Robert Soriano',
    },

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is Vue Clerk?', link: '/what-is-vue-clerk' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Plugin', link: '/plugin' },
        ],
      },
      {
        text: 'Components',
        collapsed: true,
        items: [
          {
            text: 'Authentication',
            base: '/components/authentication',
            items: [
              { text: 'SignIn', link: '/sign-in.md' },
              { text: 'SignUp', link: '/sign-up.md' },
            ],
          },
          {
            text: 'User',
            base: '/components/user',
            items: [
              { text: 'UserButton', link: '/user-button.md' },
              { text: 'UserProfile', link: '/user-profile.md' },
            ],
          },
          {
            text: 'Organization',
            base: '/components/organization',
            items: [
              { text: 'CreateOrganization', link: '/create-organization.md' },
              { text: 'OrganizationProfile', link: '/organization-profile.md' },
              { text: 'OrganizationSwitcher', link: '/organization-switcher.md' },
              { text: 'OrganizationList', link: '/organization-list.md' },
            ],
          },
          {
            text: 'Control',
            base: '/components/control',
            items: [
              { text: 'ClerkLoaded', link: '/clerk-loaded.md' },
              { text: 'ClerkLoading', link: '/clerk-loading.md' },
              { text: 'Protect', link: '/protect.md' },
              { text: 'RedirectToSignIn', link: '/redirect-to-signin.md' },
              { text: 'RedirectToSignUp', link: '/redirect-to-signup' },
              { text: 'RedirectToUserProfile', link: '/redirect-to-userprofile.md' },
              { text: 'RedirectToOrganizationProfile', link: '/redirect-to-organizationprofile.md' },
              { text: 'RedirectToCreateOrganization', link: '/redirect-to-createorganization.md' },
              { text: 'SignedIn', link: '/signed-in.md' },
              { text: 'SignedOut', link: '/signed-out.md' },
            ],
          },
          {
            text: 'Unstyled',
            base: '/components/unstyled',
            items: [
              { text: 'SignInButton', link: '/sign-in-button.md' },
              { text: 'SignOutButton', link: '/sign-out-button.md' },
              { text: 'SignUpButton', link: '/sign-up-button.md' },
            ],
          },
        ],
      },
      {
        text: 'Composables',
        collapsed: true,
        items: [
          { text: 'useAuth', link: '/composables/use-auth.md' },
          { text: 'useClerk', link: '/composables/use-clerk.md' },
          { text: 'useSession', link: '/composables/use-session.md' },
          { text: 'useSessionList', link: '/composables/use-session-list.md' },
          { text: 'useSignIn', link: '/composables/use-sign-in.md' },
          { text: 'useSignUp', link: '/composables/use-sign-up.md' },
          { text: 'useUser', link: '/composables/use-user.md' },
        ],
      },
      {
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Nuxt', link: '/guides/nuxt.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wobsoriano/vue-clerk' },
    ],
  },
})
