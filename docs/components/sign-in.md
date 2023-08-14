---
outline: deep
---

<script setup>
import { SignIn } from '../../src'
</script>

# SignIn

The `<SignIn/>` component renders a UI for signing in users. Most of the times, the `<SignIn/>` component is all you need for completing sign ins. It supports any authentication scheme, from Email/password authentication, and Passwordless, to Social Login (OAuth) and Multi-factor verification as well.

<div style="margin-left: 65px; margin-top: 40px;">
  <SignIn />
</div>

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
