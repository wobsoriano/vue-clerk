---
outline: deep
---

# useSignUp()

The `useSignUp()` composable gives you access to the [`SignUp`](https://clerk.com/docs/references/javascript/sign-up/sign-up) object, which allows you to check the current state of a sign-up. This is also useful for creating a custom sign-up flow.

## Returns

Click [here](https://clerk.com/docs/references/react/use-sign-up#use-sign-up-returns) to see the full list of properties returned.

## Usage

### Check the current state of a up

Use the `useSignUp()` composable to check the current state of a sign-up.

```vue
<script>
import { useSignIn } from 'vue-clerk'

const { isLoaded, signUp } = useSignIn()
</script>

<template>
  <div v-if="isLoaded">
    The current sign-up attempt status is {{ signUp.status }}.
  </div>
  <div v-else>Loading...</div>
</template>
```

### Create a custom sign-up flow

The `useSignUp()` composable can also be used to build fully custom sign-up flows, if Clerk's pre-built components don't meet your specific needs or if you require more control over the authentication flow. Different sign-up flows include email and password, email and phone codes, email links, and multifactor (MFA). To learn more about using the `useSignUp()` composable to create custom flows, check out the [custom flow guides](https://clerk.com/docs/custom-flows/overview).
