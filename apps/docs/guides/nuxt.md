---
outline: deep
---

# Nuxt

Vue Clerk offers a Nuxt module that simplifies the integration of Clerk into your Nuxt application.

## 1. Install Vue Clerk and H3 Clerk

::: code-group

```bash [npm]
npm install vue-clerk @clerk/backend
```

```bash [yarn]
yarn add vue-clerk @clerk/backend
```

```bash [pnpm]
pnpm add vue-clerk @clerk/backend
```

:::

## 2. Install module

In your `nuxt.config.ts` file, add the `vue-clerk/nuxt` module to the `modules` array, and it will auto-import all components and composables for you.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['vue-clerk/nuxt'],
})
```

## 3. Set your environment variables

Create a `.env` file in the root of your project and add your Clerk environment variables:

```bash
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## 4. Configure module

You can add Vue Clerk [plugin](/plugin#properties) options in your `nuxt.config.ts` file:

```ts
export default defineNuxtConfig({
  modules: ['vue-clerk/nuxt'],
  clerk: {
    appearance: {},
  }
})
```

## 5. Add a route middleware to protect routes

```ts
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const { isSignedIn } = useAuth() // works in SSR and CSR!

  const protectedPages = ['dashboard']
  const publicPages = ['sign-in', 'sign-up']

  if (isSignedIn.value && publicPages.includes(to.name))
    return navigateTo('/dashboard')

  if (!isSignedIn.value && protectedPages.includes(to.name))
    return navigateTo('/sign-in')
})
```

## 6. Protect your API endpoints

```ts
import { clerkClient, getAuth } from '#clerk'

export default eventHandler((event) => {
  const { userId } = getAuth(event)

  if (!userId) {
    setResponseStatus(event, 403)
    return
  }

  return clerkClient(event).users.getUser(userId)
})
```

A complete example can be found [here](https://github.com/wobsoriano/nuxt-clerk-template).
