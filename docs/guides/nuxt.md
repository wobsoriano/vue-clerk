---
outline: deep
---

# Nuxt

## 1. Install vue-clerk and h3-clerk

The [h3-clerk](https://github.com/wobsoriano/h3-clerk) package is a h3 middleware used to add Clerk authentication to your h3/Nuxt server.

::: code-group

```bash [npm]
npm install vue-clerk h3-clerk
```

```bash [yarn]
yarn add vue-clerk h3-clerk
```

```bash [pnpm]
pnpm add vue-clerk h3-clerk
```

:::

## 2. Set your environment variables

Create a `.env` file in the root of your project and add your Clerk environment variables:

```bash
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## 3. Install the h3-clerk middleware

Adding this will inject a `auth` object to the context of your h3 server. You can then use that to protected your API routes!

```js
// server/middleware/clerk.ts
import { withClerkMiddleware } from 'h3-clerk'

export default withClerkMiddleware()
```

## 4. Install the Clerk plugin

Notice here that we are setting an initial state for the user. This will let us use some of the composables in SSR and check if user is authenticated or not in route middlewares.

```js
// plugins/vue-clerk.ts
import { clerkPlugin } from 'vue-clerk'

export default defineNuxtPlugin((nuxtApp) => {
  const { publishableKey } = useRuntimeConfig().public
  const serverInitialState = useState('clerk-initial-state', () => undefined)

  // Installing the `withClerkMiddleware` from `h3-clerk` adds an `auth` object to the context.
  // We can then use the `auth` object to get the initial state of the user.
  if (import.meta.server) {
    const authContext = useRequestEvent()?.context.auth
    serverInitialState.value = authContext ? pruneUnserializableFields(authContext) : undefined
  }

  nuxtApp.vueApp.use(clerkPlugin, {
    publishableKey,
    routerPush: to => navigateTo(to),
    routerReplace: to => navigateTo(to, { replace: true }),
    initialState: serverInitialState.value,
  })
})

function pruneUnserializableFields(authContext) {
  return JSON.parse(JSON.stringify(authContext))
}
```

## 5. Add a route middleware to protect private pages

```ts
// middleware/auth.ts
import { useAuth } from 'vue-clerk'

export default defineNuxtRouteMiddleware(() => {
  // isSignedIn here can be used in both SSR and CSR
  // since we set an initial state in the plugin!
  const { isSignedIn } = useAuth()

  if (!isSignedIn.value)
    return navigateTo('/sign-in')
})
```

That's it!

A complete example can be found [here](https://github.com/wobsoriano/nuxt-clerk-template).
