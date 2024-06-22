---
outline: deep
---

# `<RedirectToSignIn />`

The `<RedirectToSignIn />` component will navigate to the sign in URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Props

Click [here](https://clerk.com/docs/components/control/redirect-to-signin#properties) to see the full list of props available.

## Usage

```vue
<script setup>
import { RedirectToSignIn, SignedIn, SignedOut } from 'vue-clerk'
</script>

<template>
  <SignedIn>
    Content that is displayed to signed in
    users.
  </SignedIn>
  <SignedOut>
    <RedirectToSignIn />
  </SignedOut>
</template>
```
