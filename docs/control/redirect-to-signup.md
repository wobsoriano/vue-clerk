---
outline: deep
---

# `<RedirectToSignUp />`

The `<RedirectToSignUp />` component will navigate to the sign up URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Usage

```vue
<script setup>
import { RedirectToSignUp, SignedIn, SignedOut } from 'vue-clerk'
</script>

<template>
  <SignedIn>
    Content that is displayed to signed in users.
  </SignedIn>
  <SignedOut>
    <RedirectToSignUp />
  </SignedOut>
</template>
```

## Props

|Name|Type|Description|
|:----|:----|:----|
|`signInFallbackRedirectUrl?`|`string`|The fallback URL to redirect to after the user signs up, if there's no `redirect_url` in the path already. Defaults to `/`. It's recommended to use [the environment variable](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects) instead.|
|`signInForceRedirectUrl`|`string`|If provided, this URL will always be redirected to after the user signs up. It's recommended to use [the environment variable instead](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects).|
|`initialValues`|[`SignInInitialValues`](https://clerk.com/docs/references/javascript/types/sign-in-initial-values)|The values used to prefill the sign-in fields with.|
