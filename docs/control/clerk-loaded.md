---
outline: deep
---

# `<ClerkLoaded />`

The `<ClerkLoaded>` component guarantees that the Clerk object has loaded and will be available under `window.Clerk`. This allows you to wrap child components to access the `Clerk` object without the need to check it exists.

## Usage

```vue
<script setup>
import { ClerkLoaded } from 'vue-clerk'
</script>

<template>
  <ClerkLoaded>
    <Page />
  </ClerkLoaded>
</template>
```

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'This page uses Clerk ' + window.Clerk.version
})
</script>

<template>
  <div>The content</div>
</template>
```
