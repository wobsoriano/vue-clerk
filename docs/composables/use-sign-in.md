---
outline: deep
---

# useSignIn()

The `useSignIn()` composable provides access to the [`SignIn`](https://clerk.com/docs/references/javascript/sign-in/sign-in) object, which allows you to check the current state of a sign-in. This is also useful for creating a custom sign-in flow.

## Returns

Click [here](https://clerk.com/docs/references/react/use-sign-in#use-sign-in-returns) to see the full list of properties returned.

## Usage

### Check the current state of a sign-in

Use the `useSignIn()` composable to check the current state of a sign-in.

```vue
<script>
import { useSignIn } from 'vue-clerk'

const { isLoaded, signIn } = useSignIn()
</script>

<template>
  <div v-if="isLoaded">
    The current sign in attempt status is {{ signIn.status }}.
  </div>
  <div v-else>Loading...</div>
</template>
```

### Create a custom sign-in flow

The `useSignIn()` composable can also be used to build fully custom sign-in flows, if Clerk's pre-built components don't meet your specific needs or if you require more control over the authentication flow. Different sign-in flows include email and password, email and phone codes, email links, and multifactor (MFA). To learn more about using the `useSignIn()` composable to create custom flows, check out the [custom flow guides](https://clerk.com/docs/custom-flows/overview).
