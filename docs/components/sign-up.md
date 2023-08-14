---
outline: deep
---

# SignUp

A beautiful, high-conversion sign-up flow with your choice of required fields and social sign-up providers.

## Embedding a `<SignUp/>` component

```vue
<script lang="ts">
import { useAuth } from 'vue-clerk'

const { isLoaded, userId, sessionId } = useAuth()
</script>

<template>
  <div v-if="isLoaded && userId">
    Hello, {{ userId }}
  </div>
</template>
```
