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

## Props

|Name|Type|Description|
|--- |--- |--- |
|userId|`string`|The ID of the active user, or null when signed out. In data-loaders, this is often the only piece of information needed to securely retrieve the data associated with a request.|
|sessionId|`string`|The ID of the active session, or null when signed out. This is primarily used in audit logs to enable device-level granularity instead of user-level.|
|actor|`string`|If user impersonation is being used, this field will contain information about the impersonator.|
|getToken({ template?: string; })|`string`|Retrieves a signed JWT that is structured according to the corresponding JWT template in your dashboard. If no template parameter is provided, a default Clerk session JWT is returned.|
|orgId|`string`|A unique identifier for this organization.|
|orgRole|`string`|The role that the user will have in the organization. Valid values are admin and basic_member|
|orgSlug|`string`|The slug of the user's active organization for the current session.|
|claims|`object`|All claims for the JWT associated with the current user|
