---
outline: deep
---

# useUser()

The `useUser()` composable is a convenient way to access the current [`User`](https://clerk.com/docs/references/javascript/user/user) data where you need it. This composable provides the user data and helper methods to manage the current active session.

## Returns

Click [here](https://clerk.com/docs/references/react/use-user#use-user-returns) to see the full list of properties returned.

## Usage

### Retrieve the current user data

The following example demonstrates how to use the `useUser()` composable to access the `user` object, which includes the current user's data, like the user's full name. The `isLoaded` and `isSignedIn` properties are used to handle the loading state and to check if the user is signed in, respectively.

For more information on the `User` object, see the [reference](https://clerk.com/docs/references/javascript/user/user).

```vue
<script setup>
import { useUser } from 'vue-clerk'

const { isLoaded, isSignedIn, user } = useUser()
</script>

<template>
  <div v-if="!isLoaded">
    Loading...
  </div>
  <div v-else-if="!isSignedIn">
    Not signed in
  </div>
  <div v-else>
    Hello, {{ user.fullName }}!
  </div>
</template>
```

### Update the current user data

```vue
<script setup>
import { useUser } from 'vue-clerk'

const { user } = useUser()

async function updateUser() {
  await user.value.update({
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

### Reload user data

To retrieve the latest user data after updating the user elsewhere, use the `user.reload()` method.

For more information on the `reload()` method, see the [`User`](https://clerk.com/docs/references/javascript/user/user#reload) reference.

```vue
<script setup>
import { useUser } from 'vue-clerk'

const { user } = useUser()

async function updateUser() {
  // updated data via an api point
  const updateMeta = await fetch('/api/updateMetadata')

  // Check if the update was successful
  if (!updateMeta.message === 'success')
    throw new Error('Error updating')

  // If the update was successful, reload the user data
  user.value.reload()
}
</script>

<template>
  <div v-if="user">
    <button @click="updateUser">
      Click me to update your metadata
    </button>
    <p>user role: {{ user.publicMetadata.role }}</p>
  </div>
</template>
```
