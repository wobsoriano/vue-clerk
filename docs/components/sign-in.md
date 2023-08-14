---
outline: deep
---

<script setup>
import { SignIn, SignOutButton, useAuth } from '../../src'

const { isSignedIn } = useAuth()
</script>

# SignIn

The `<SignIn/>` component renders a UI for signing in users. Most of the times, the `<SignIn/>` component is all you need for completing sign ins. It supports any authentication scheme, from Email/password authentication, and Passwordless, to Social Login (OAuth) and Multi-factor verification as well.

<SignOutButton v-if="isSignedIn" />
<div v-else class="sign-in-container">
  <SignIn :appearance="{ elements: { card: 'clerk-card' } }" redirect-url="/components/sign-in.html" />
</div>

<style>
.sign-in-container {
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

  .sign-in-container {
    margin-left: 0;
  }
}
</style>

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

## Props

|Name|Type|Description|
|--- |--- |--- |
|appearance?|`object`|Controls the overall look and feel.|
|routing?|`RoutingStrategy`|The routing strategy for your pages. Supported values are:<br>- hash : Hash-based routing.<br>- path (default): Path-based routing.<br>- virtual: Virtual based routing.|
|path?|`string`|The path where the component is mounted when path-based routing is used.<br>-e.g. /sign-in. This prop is ignored in hash and virtual based routing.|
|redirectUrl?|`string`|Full URL or path to navigate after successful sign in or sign up. The same as setting afterSignInUrl and afterSignUpUrl to the same value.|
|afterSignInUrl?|`string`|The full URL or path to navigate after a successful sign in.|
|afterSignUpUrl?|`string`|The full URL or path to navigate after a successful sign up.|
|signUpUrl?|`string`|Full URL or path to the sign up page. Use this property to provide the target of the "Sign Up" link that's rendered.|
