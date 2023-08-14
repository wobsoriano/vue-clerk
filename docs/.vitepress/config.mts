import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Clerk',
  description: 'Clerk composables and components for Vue',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
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
          { text: 'useUser', link: '/composables/use-user.md' },
        ],
      },
      {
        text: 'Embeddable UIs',
        items: [
          { text: 'SignIn', link: '/components/sign-in.md' },
          { text: 'SignUp', link: '/components/sign-up.md' },
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
