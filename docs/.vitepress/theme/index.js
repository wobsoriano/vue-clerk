import DefaultTheme from 'vitepress/theme'
import { clerkPlugin } from '../../../src/plugin'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(clerkPlugin, {
      publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    })
  },
}
