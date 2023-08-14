---
outline: deep
---

# useAuth()

The useAuth composable is a convenient way to access the current auth state. This composable provides the minimal information needed for data-loading and helper methods to manage the current active session.

## Usage

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
