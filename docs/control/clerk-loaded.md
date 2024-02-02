---
outline: deep
---

# `<ClerkLoaded />`

The `<ClerkLoaded>` component guarantees that the [Clerk](https://clerk.com/docs/reference/clerkjs/clerk) object has loaded before rendering its children.

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
<script>
export default {
  name: 'Page',
  mounted() {
    document.title = this.$clerk.version
  }
}
</script>

<template>
  <div>The content</div>
</template>
```
