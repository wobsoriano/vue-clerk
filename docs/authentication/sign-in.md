---
outline: deep
---

# SignIn

Full-featured UI for signing users into your application.

## Overview

The `<SignIn/>` component renders a UI for signing in users. Most of the times, the `<SignIn/>` component is all you need for completing sign ins. It supports any authentication scheme, from Email/password authentication, and Passwordless, to Social Login (OAuth) and Multi-factor verification as well.

<img src="https://clerk.com/_next/image?url=%2Fdocs%2Fimages%2Fui-components%2Fcomponent-sign_in.svg&w=1080&q=75" />

## Usage

```vue
<script setup lang="ts">
import { SignIn } from 'vue-clerk'
</script>

<template>
  <SignIn />
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
