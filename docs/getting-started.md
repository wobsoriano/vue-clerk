---
outline: deep
---

# Getting Started

Learn to install and initialize Clerk in a Vue app.

After following this guide, you should have a working Vue app complete with:

- Fully fledged sign in and sign up flows.
- Google Social Login.
- Secure email/password authentication.

## Install

Once you have a Vue application ready, you need to install the Vue + Clerk integration module. This gives you access to the prebuilt components and composables for Vue applications.

```bash
npm install vue-clerk
```

## Set Environment Keys

Below is an example of your `.env.local` file. To get the respective keys go to the API Keys page in the Clerk dashboard.

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
