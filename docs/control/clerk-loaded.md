---
outline: deep
---

# ClerkLoaded

Renders when Clerk is loaded.

## Overview

The `<ClerkLoaded>` component guarantees that the [Clerk](https://clerk.com/docs/reference/clerkjs/clerk) object has loaded before rendering its children.

## Usage

Rendering the `<ClerkLoaded/>` component allows immediate access to the Clerk object without the need to check if it exists.

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
