---
outline: deep
---

<script setup>
import { SignUp, SignOutButton, useAuth } from '../../src'

const { isSignedIn } = useAuth()
</script>

# SignUp

A beautiful, high-conversion sign-up flow with your choice of required fields and social sign-up providers.

## Overview

The `<SignUp/>` component is used to render a beautiful, high-conversion sign-up flow with your choice of required fields and social sign-up providers.

<SignOutButton v-if="isSignedIn">SIGN OUT TO VIEW COMPONENT</SignOutButton>
<div v-else class="sign-up-container">
  <SignUp :appearance="{ elements: { card: 'clerk-card' } }" redirect-url="/components/sign-up.html" />
</div>

<style>
.sign-up-container {
  margin-top: 2rem;
  margin-left: 3rem;
}

.clerk-card {
  width: 25rem;
}

@media (max-width: 480px) {
  .clerk-card {
    width: auto;
  }

  .sign-up-container {
    margin-left: 0;
  }
}
</style>

## Usage

```vue
<script lang="ts">
import { SignUp } from 'vue-clerk'
</script>

<template>
  <SignUp />
</template>
```

## Props

|Name|Type|Description|
|--- |--- |--- |
|appearance?|`object`|Controls the overall look and feel|
|routing?|`RoutingStrategy`|The routing strategy for your pages. Supported values are:<br>-hash: Hash based routing.<br>- path (default): Path-based routing.<br>-virtual: Virtual based routing.|
|path?|`string`|The path where the component is mounted when path-based routing is used.<br>-e.g. /sign-up. This prop is ignored in hash and virtual based routing.|
|redirectUrl?|`string`|Full URL or path to navigate after successful sign in or sign up. The same as setting afterSignInUrl and afterSignUpUrl to the same value.|
|afterSignUpUrl?|`string`|The full URL or path to navigate after a successful sign up.|
|afterSignInUrl?|`string`|The full URL or path to navigate after a successful sign in.|
|signInUrl?|`string`|Full URL or path to the sign up page. Use this property to provide the target of the "Sign In" link that's rendered at the bottom of the component.|
