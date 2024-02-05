---
outline: deep
---

# `<RedirectToOrganizationProfile />`

The `<RedirectToOrganizationProfile />` component will navigate to the organization profile URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Usage

```vue
<script setup>
import { RedirectToOrganizationProfile, SignedIn, SignedOut } from 'vue-clerk'
</script>

<template>
  <SignedIn>
    <RedirectToOrganizationProfile/>
  </SignedIn>
  <SignedOut>
    Please Sign In
  </SignedOut>
</template>
```
