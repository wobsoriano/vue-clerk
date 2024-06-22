---
outline: deep
---

# useSessionList()

The `useSessionList()` composable returns an array of [`Session`](https://clerk.com/docs/references/javascript/session) objects that have been registered on the client device.

## Returns

Click [here](https://clerk.com/docs/references/react/use-session-list#use-session-list-returns) to see the full list of properties returned.

## Usage

The following example demonstrates how to use the `useSessionList()` composable to retrieve a list of sessions that have been registered on the client device. The `isLoaded` property is used to handle the loading state, and the `sessions` property is used to display the number of times the user has visited the page.

```vue
<script setup>
import { useSessionList } from 'vue-clerk'

const { isLoaded, sessions } = useSessionList()
</script>

<template>
  <div v-if="isLoaded">
    <p>
      Welcome back. You have been here
      {{ sessions.length }} times before.
    </p>
  </div>
</template>
```
