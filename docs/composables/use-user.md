---
outline: deep
---

# useUser()

The useUser composable returns the current user state: `{ isLoaded, isSignedIn, user }`. You can use the `user` object to access the currently active [User](https://clerk.com/docs/reference/clerkjs/user). It can be used to update the user or display information about the user's profile, like their name or email address.

## Usage

### Retrieve user data

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

### Update user data

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

## Props

|Name|Type|Description|
|--- |--- |--- |
|userId|`string`|The ID of the active user, or null when signed out. In data-loaders, this is often the only piece of information needed to securely retrieve the data associated with a request.|
|sessionId|`string`|The ID of the active session, or null when signed out. This is primarily used in audit logs to enable device-level granularity instead of user-level.|
|actor|`string`|If user impersonation is being used, this field will contain information about the impersonator.|
|getToken({ template?: string; })|`string`|Retrieves a signed JWT that is structured according to the corresponding JWT template in your dashboard. If no template parameter is provided, a default Clerk session JWT is returned.|
|orgId|`string`|A unique identifier for this organization.|
|orgRole|`string`|The role that the user will have in the organization. Valid values are admin and basic_member|
|claims|`object`|All claims for the JWT associated with the current user|
