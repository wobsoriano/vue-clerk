---
outline: deep
---

# useAuth()

The `useAuth()` composable is a convenient way to access the current auth state. This composable provides the minimal information needed for data-loading and helper methods to manage the current active session.

## Returns

Click [here](https://clerk.com/docs/references/react/use-auth#use-auth-returns) to see the full list of properties returned.

## Usage

The following example demonstrates how to use the `useAuth()` composable to access the current auth state, like whether the user is signed in or not. It also demonstrates a basic example of how you could use the `getToken()` method to retrieve a session token for fetching data from an external resource.

```vue
<script setup>
import { useAuth } from 'vue-clerk'

const { getToken, isLoaded, isSignedIn } = useAuth()

async function fetchDataFromExternalResource() {
  const token = await getToken.value()
  // Add logic to fetch your data
  return data
}
</script>

<template>
  <div v-if="!isLoaded">
    Loading...
  </div>
  <div v-else-if="!isSignedIn">
    Sign in to view this page
  </div>
  <div v-else>
    ...
  </div>
</template>
```
