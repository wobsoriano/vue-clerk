---
outline: deep
---

# `<ClerkLoading />`

The `<ClerkLoading>` renders its children while Clerk is loading, and is helpful for showing a custom loading state.

## Usage

```vue
<script setup>
import { ClerkLoaded, ClerkLoading } from 'vue-clerk'
</script>

<template>
  <ClerkLoading>
    <div>Clerk is loading...</div>
  </ClerkLoading>
  <ClerkLoaded>
    <Page />
  </ClerkLoaded>
  <div>This div is always visible</div>
</template>
```
