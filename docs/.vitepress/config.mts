import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Clerk',
  description: 'Clerk composables and components for Vue',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
    ],

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
