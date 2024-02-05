---
outline: deep
---

# `<RedirectToUserProfile />`

The `<RedirectToUserProfile />` component will navigate to the user profile URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Usage

```vue
<script setup>
import { RedirectToUserProfile, SignedIn, SignedOut } from 'vue-clerk'
</script>

<template>
  <SignedIn>
    <RedirectToUserProfile/>
  </SignedIn>
  <SignedOut>
    Please Sign In
  </SignedOut>
</template>
```
