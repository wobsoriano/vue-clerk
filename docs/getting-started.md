---
outline: deep
---

# Getting Started

Learn how to make Vue Clerk components available in your project.

## Overview

Vue Clerk is a wrapper around ClerkJS. It's a way to integrate Clerk into your Vue application.

Vue Clerk provides Vue implementations of [Clerk Components](https://clerk.com/components/sign-in); highly customizable, pre-built components that you can use to build beautiful user management applications. You can find display components for building [sign in](https://clerk.com/components/sign-in), [sign up](https://clerk.com/components/sign-up), [account switching](https://clerk.com/components/user-button) and [user profile management](https://clerk.com/components/user-profile) pages as well as flow [control components](https://clerk.com/docs/component-reference/clerk-loaded) that act as helpers for implementing a seamless authentication experience.

Vue Clerk comes loaded with custom [composables](/composables/use-clerk.html). These composables give you access to the [Clerk object](https://clerk.com/docs/reference/clerkjs/clerk), and a set of useful helper methods for signing in and signing up.

## Setting up Vue Clerk

::: warning
You need to create a Clerk Application in your [Clerk Dashboard](https://dashboard.clerk.com/) before you can set up Vue Clerk. For more information, check out our [Set up your application](https://clerk.com/docs/authentication/set-up-your-application) guide.
:::

```bash
npm install vue-clerk
```

## Set Environment Keys

Below is an example of your `.env.local` file. To get the respective keys go to the [API Keys page](https://dashboard.clerk.com/last-active?path=api-keys) in the Clerk dashboard.

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_••••••••••••••••••••••••••••••••••
```

## Configure plugin

Vue Clerk requires your application to have the plugin installed. The Clerk plugin provides active session and user context to Clerk's composables and other components.

```ts
import { createApp } from 'vue'
import { clerkPlugin } from 'vue-clerk'

import App from './App.vue'

const app = createApp(App)

app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
})

app.mount('#app')
```
