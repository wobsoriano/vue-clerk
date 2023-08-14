---
outline: deep
---

# useUser()

The useUser composable returns the current user state: `{ isLoaded, isSignedIn, user }`. You can use the `user` object to access the currently active [User](https://clerk.com/docs/reference/clerkjs/user). It can be used to update the user or display information about the user's profile, like their name or email address.

## Usage

## Retrieve user data

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

## Update user data

```vue
<script lang="ts">
import { useUser } from 'vue-clerk'

const { user } = useUser()

async function updateUser() {
  await user.update({
    firstName: 'John',
    lastName: 'Doe',
  })
}
</script>

<template>
  <div v-if="user">
    <button @click="updateUser">
      Click me to update your name
    </button>
    <p>user.firstName: {{ user.firstName }}</p>
    <p>user.lastName: {{ user.lastName }}</p>
  </div>
</template>
```
