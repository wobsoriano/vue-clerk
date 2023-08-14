---
outline: deep
---

# Getting Started

Learn to install and initialize Clerk in a Vue app.

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

## Read Session & User Data

Vue Clerk provides a set of composables and helpers that you can use to access the active session and user data in your Vue application. We have included examples of how to use these helpers to get you started.

### useAuth

The useAuth composable is a convenient way to access the current auth state. This composable provides the minimal information needed for data-loading and helper methods to manage the current active session.

```vue
<script lang="ts">
import { useAuth } from 'vue-clerk'

const { isLoaded, userId, sessionId } = useAuth()
</script>

<template>
  <div v-if="isLoaded && userId">
    Hello, {{ userId }} your current active session is {{ sessionId }}
  </div>
</template>
```

### useUser

The useUser composable is a convenient way to access the current user data where you need it. This composable provides the user data and helper methods to manage the current active session.

```vue
<script lang="ts">
import { useUser } from 'vue-clerk'

const { isLoaded, isSignedIn, user } = useUser()
</script>

<template>
  <div v-if="isLoaded && isSignedIn">
    Hello, {{ user.firstName }} welcome to Clerk
  </div>
</template>
```
