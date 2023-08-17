import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Vue Clerk',
  description: 'Clerk composables and components for Vue',
  lastUpdated: true,
  cleanUrls: true,
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
          // {
          //   text: 'Contributing',
          //   link: 'https://github.com/wobsoriano/vue-clerk/blob/main/.github/contributing.md',
          // },
        ],
      },
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
        items: [
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      {
        text: 'Composables',
        items: [
          { text: 'useAuth', link: '/composables/use-auth.md' },
          { text: 'useClerk', link: '/composables/use-clerk.md' },
          { text: 'useSession', link: '/composables/use-session.md' },
          { text: 'useSignIn', link: '/composables/use-sign-in.md' },
          { text: 'useSignUp', link: '/composables/use-sign-up.md' },
          { text: 'useUser', link: '/composables/use-user.md' },
        ],
      },
      {
        text: 'UI Components',
        items: [
          { text: 'SignIn', link: '/components/sign-in.md' },
          { text: 'SignUp', link: '/components/sign-up.md' },
          { text: 'SignInButton', link: '/components/sign-in-button.md' },
          { text: 'SignOutButton', link: '/components/sign-out-button.md' },
          { text: 'UserButton', link: '/components/user-button.md' },
          { text: 'UserProfile', link: '/components/user-profile.md' },
        ],
      },
      {
        text: 'Control Components',
        items: [
          { text: 'ClerkLoaded', link: '/components/clerk-loaded.md' },
          { text: 'ClerkLoading', link: '/components/clerk-loading.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wobsoriano/vue-clerk' },
    ],
  },
  vite: {
    ssr: {
      noExternal: ['@clerk/clerk-js'],
    },
  },
})
