---
outline: deep
---

# useSession()

The `useSession()` composable provides access to the current user's [`Session`](https://clerk.com/docs/references/javascript/session) object, as well as helpers for setting the active session.

## Returns

Click [here](https://clerk.com/docs/references/react/use-session#use-session-returns) to see the full list of properties returned.

## Usage

The following example demonstrates how to use the `useSession()` composable to access the `SignIn` object, which has the `lastActiveAt` property on it. The `lastActiveAt` property is used to display the last active time of the current session to the user.

```vue
<script setup>
import { useSession } from 'vue-clerk'

const { isLoaded, session, isSignedIn } = useSession()
</script>

<template>
  <div v-if="!isLoaded">
    Loading...
  </div>
  <div v-else-if="!isSignedIn">
    Not signed in
  </div>
  <div v-else>
    This session has been active since {{ session.lastActiveAt.toLocaleString() }}.
  </div>
</template>
```
