---
outline: deep
---

# Getting Started

::: info
You need to create a Clerk Application in your [Clerk Dashboard](https://dashboard.clerk.com/) before you can set up Vue Clerk. For more information, check out our [Set up your application](https://clerk.com/docs/authentication/set-up-your-application) guide.
:::

## 1. Set up a Vue application use Vite

Scaffold your new Vue application using [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

::: code-group

```bash [npm]
npm create vite@latest vue-clerk-quickstart --template vue-ts
cd vue-clerk-quickstart
npm install
npm run dev
```

```bash [yarn]
yarn create vite vue-clerk-quickstart --template vue-ts
cd vue-clerk-quickstart
yarn install
yarn dev
```

```bash [pnpm]
pnpm create vite vue-clerk-quickstart --template vue-ts
cd vue-clerk-quickstart
pnpm install
pnpm dev
```

:::

## 2. Install Vue Clerk

The Vue Clerk SDK gives you access to prebuilt components, composables, and helpers for Vue.

To get started using Clerk with Vue, add the SDK to your project:

::: code-group

```bash [npm]
npm install vue-clerk
```

```bash [yarn]
yarn add vue-clerk
```

```bash [pnpm]
pnpm add vue-clerk
```

:::

## 3. Set your environment variables

1. If you don't have an `.env.local` file in the root directory of your Vue project, create one now.

2. Find your Clerk publishable key. If you're signed into Clerk, the `.env.local` snippet below will contain your key. Otherwise:

- Navigate to the [Clerk Dashboard](https://dashboard.clerk.com) and select your application.
- In the navigation sidebar, select API Keys.
- You can copy your key from the Quick Copy section.

3. Add your key to your `.env.local` file.

The final result should look like this:

```bash [.env.local]
VITE_CLERK_PUBLISHABLE_KEY=pk_test_************************
```

## 4. Import the Clerk publishable key

You will need to import your Clerk publishable key into your application. You can add an `if` statement to check that it is imported and that it exists. This will prevent running the application without the publishable key, and will also prevent TypeScript errors.

```ts{4,6-8}
import { createApp } from 'vue'
import App from './App.vue'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const app = createApp(App)
app.mount('#app')
```

## 5. Add the Clerk plugin to your app

The plugin provides active session and user context.

To make this data available across your entire app, install the Clerk plugin. You must pass your publishable key as a prop to the plugin.

```ts{3,12-14}
import { createApp } from 'vue'
import App from './App.vue'
import { clerkPlugin } from 'vue-clerk'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const app = createApp(App)
app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY
})
app.mount('#app')
```

## 6. Create a header with Clerk components

You can control which content signed in and signed out users can see with Clerk's [prebuilt components](https://clerk.com/docs/components/overview). To get started, create a header for your users to sign in or out. To do this, you will use:

- [`<SignedIn>`](/components/control/signed-in): Children of this component can only be seen while signed in.
- [`<SignedOut>`](/components/control/signed-out): Children of this component can only be seen while signed out.
- [`<UserButton />`](/components/user/user-button): A prebuilt component that comes styled out of the box to show the avatar from the account the user is signed in with.
- [`<SignInButton />`](/components/unstyled/sign-in-button): An unstyled component that links to the sign-in page or displays the sign-in modal.

```vue{2,6-11}
<script setup>
import { SignedIn, SignedOut, SignInButton, UserButton } from 'vue-clerk'
</script>

<template>
  <SignedOut>
    <SignInButton />
  </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn>
</template>
```

Then, visit your app's homepage at http://localhost:5173 while signed out to see the sign-in button. Once signed in, your app will render the user button.
