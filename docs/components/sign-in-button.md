---
outline: deep
---

# SignInButton

Show a button that links to the sign-in URL or opens the sign-in modal

## Overview

`<SignInButton/>` is a button that links to the sign-in page or displays the sign-in modal. By default, it is a `<button>` tag that says Sign in, but it is completely customizable by passing children.

## Usage

```vue
<script setup lang="ts">
import { SignInButton } from 'vue-clerk'
</script>

<template>
  <SignInButton />
</template>
```

## Props

|Name|Type|Description|
|--- |--- |--- |
|mode|`"redirect" (default)` | "modal"|If mode is set to "redirect", the button will redirect to the sign-up page. If mode is set to "modal", the button will open a modal instead. Defaults to "redirect".|
|redirectUrl?|`string`|Full URL or path to navigate to after successful sign in or sign up. Use this instead of setting afterSignInUrl and afterSignUpUrl to the same value. To return to the same URL, set to window.location.href|
|afterSignInUrl?|`string`|The full URL or path to navigate to after a successful sign in. Defaults to the Sign-in URL on the Paths page of your Dashboard.|
|afterSignUpUrl?|`string`|The full URL or path to navigate to after a successful sign up. Defaults to the Sign-up URL on the Paths page of your Dashboard.|
