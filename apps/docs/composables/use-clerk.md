---
outline: deep
---

# useClerk()

The `useClerk()` composable provides access to the [`Clerk`](https://clerk.com/docs/references/javascript/clerk/clerk) object, giving you the ability to build alternatives to any Clerk Component.

::: warning
This is intended to be used for advanced use cases, like building a completely custom OAuth flow or as an escape hatch for getting access to the `Clerk` object.
:::

## Returns

The `useClerk()` composable returns the `Clerk` object, which includes all the methods and properties listed in the [`Clerk` reference](https://clerk.com/docs/references/javascript/clerk/clerk).

## Usage

```vue
<script setup>
import { useClerk } from 'vue-clerk'

const clerk = useClerk()
</script>

<template>
  <button @click="clerk.openSignIn">
    Sign in
  </button>
</template>
```
