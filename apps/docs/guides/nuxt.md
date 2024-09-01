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
NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NUXT_CLERK_SECRET_KEY=
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

You can use the `auth` middleware to protect pages while doing client side routing.

```vue
<script setup>
definePageMeta({ middleware: 'auth', auth: { redirectUrl: '/sign-in' } })
</script>

<template>
  <h1>Authenticated only</h1>
</template>
```

For guest only pages, you can use the `guest` middleware.

```vue
<script setup>
definePageMeta({ middleware: 'guest', auth: { redirectUrl: '/profile' } })
</script>

<template>
  <h1>Guest only</h1>
</template>
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
