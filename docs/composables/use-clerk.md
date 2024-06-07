---
outline: deep
---

# useClerk()

Access the Clerk object inside your components.

## Overview

The `useClerk` composable accesses the [Clerk](https://clerk.com/docs/reference/clerkjs/clerk) object. It can be used to retrieve any object in the [ClerkJS](https://reference.clerk.dev/reference/clerkjs) SDK. Moreover, it allows access to all of the [Clerk object's methods](https://clerk.com/docs/reference/clerkjs/clerk#methods), giving you the freedom to build alternatives to any [Clerk Component](https://clerk.com/docs/reference/clerkjs/clerk).

## Usage

An example of the `useClerk` composable in action is shown below. We get access to the [Clerk](https://clerk.com/docs/reference/clerkjs/clerk) object in order to render a button that opens the [sign in](https://clerk.com/docs/component-reference/sign-in) form as a modal.

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
