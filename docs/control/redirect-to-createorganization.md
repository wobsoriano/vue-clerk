---
outline: deep
---

# `<RedirectToCreateOrganization />`

The `<RedirectToCreateOrganization />` component will navigate to the create organization flow which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Usage

```vue
<script setup>
import { RedirectToCreateOrganization, SignedIn, SignedOut } from 'vue-clerk'
</script>

<template>
  <SignedIn>
    <RedirectToCreateOrganization />
  </SignedIn>
  <SignedOut>
    Please Sign In
  </SignedOut>
</template>
```
