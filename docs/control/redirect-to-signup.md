---
outline: deep
---

# `<RedirectToSignUp />`

The `<RedirectToSignUp />` component will navigate to the sign up URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Usage

```vue
<script setup>
import { RedirectToSignUp, SignedIn, SignedOut } from 'vue-clerk'
</script>

<template>
  <SignedIn>
    Content that is displayed to signed in users.
  </SignedIn>
  <SignedOut>
    <RedirectToSignUp />
  </SignedOut>
</template>
```
