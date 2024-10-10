---
outline: deep
---

# Nuxt

Vue Clerk offers a Nuxt module that simplifies the integration of Clerk into your Nuxt application.

## 1. Install `vue-clerk` and `@clerk/backend`

`@clerk/backend` is used to interact with [Clerk's Backend API](https://clerk.com/docs/reference/backend-api) and to add authentication utilities to your API routes.

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
  clerk: {
    appearance: {},
  }
})
```

## 3. Set your environment variables

Create a `.env` file in the root of your project and add your Clerk environment variables:

```bash
NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NUXT_CLERK_SECRET_KEY=
```

Full list of environment variables can be found [here](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects). Just replace `NEXT` with `NUXT`.

## 4. Add route middleware to protect routes

You can use the `auth` middleware to protect pages while doing client side routing. You can also pass specific permission and role.

```vue
<script setup>
definePageMeta({
  middleware: 'auth',
  auth: {
    guestRedirectUrl: '/sign-in',
    // permission: 'org:invoices:create',
    // role: 'org:billing'
    // condition: (has) => has('org:invoices:create')
  }
})
</script>

<template>
  <h1>Authenticated only</h1>
</template>
```

For guest only pages, you can use the `guest` middleware.

```vue
<script setup>
definePageMeta({ middleware: 'guest', auth: { authenticatedRedirectUrl: '/profile' } })
// authenticatedRedirectUrl will default to:
// 1. `authenticatedRedirectUrl` if set
// 1. NUXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL env variable if set
// 2. NUXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL if set and (1.) is not set
</script>

<template>
  <h1>Guest only</h1>
</template>
```

## 5. Protect your API endpoints

To protect your routes, use the `getAuth()` function in your event handlers. This function retrieves the authentication state from the event object returning an [`Auth`](https://clerk.com/docs/references/nextjs/auth-object#auth-object) object that includes the `userId`, allowing you to determine if the user is authenticated..

```ts
import { clerkClient, getAuth } from 'vue-clerk/server'

export default eventHandler((event) => {
  const { userId } = getAuth(event)

  if (!userId) {
    setResponseStatus(event, 401)
    return
  }

  return clerkClient(event).users.getUser(userId)
})
```

A complete example can be found [here](https://github.com/wobsoriano/nuxt-clerk-template).
