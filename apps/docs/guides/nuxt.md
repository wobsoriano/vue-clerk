---
outline: deep
---

# Nuxt

Vue Clerk offers a Nuxt module that simplifies the integration of Clerk into your Nuxt application.

## 1. Install module

In your `nuxt.config.ts` file, add the `vue-clerk/nuxt` module to the `modules` array, and it will auto-import all components and composables for you. This also installs [h3-clerk](https://github.com/wobsoriano/h3-clerk) for server-side authentication.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['vue-clerk/nuxt'],
})
```

## 2. Set your environment variables

Create a `.env` file in the root of your project and add your Clerk environment variables:

```bash
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## 3. Configure module

You can add Vue Clerk [plugin](/plugin#properties) options in your `nuxt.config.ts` file:

```ts
export default defineNuxtConfig({
  modules: ['vue-clerk/nuxt'],
  clerk: {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    appearance: {},
  }
})
```

## 4. Add a route middleware to protect routes

```ts
// middleware/auth.global.ts
import { useAuth } from 'vue-clerk'

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

## 5. Protect your API endpoints

```ts
import { clerkClient, getAuth } from 'h3-clerk'

export default eventHandler((event) => {
  const { userId } = getAuth(event)

  if (!userId) {
    setResponseStatus(event, 403)
    return
  }

  return clerkClient.users.getUser(userId)
})
```

A complete example can be found [here](https://github.com/wobsoriano/nuxt-clerk-template).
