---
outline: deep
---

# `<GoogleOneTap />`

::: info
To use Google One Tap with Clerk, you must [enable Google as a social connection in the Clerk Dashboard](https://clerk.com/docs/authentication/social-connections/google#configuring-google-social-connection) and make sure to use custom credentials.
:::

The `<GoogleOneTap />` component renders the [Google One Tap UI](https://developers.google.com/identity/gsi/web/guides/features) so that users can use a single button to sign-up or sign-in to your Clerk application with their Google accounts.

By default, this component will redirect users back to the page where the authentication flow started. However, you can override this with [force redirect URL props](https://clerk.com/docs/components/authentication/google-one-tap#google-one-tap-props) or [force redirect URL environment variables](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects).

## Props

Click [here](https://clerk.com/docs/components/authentication/google-one-tap#google-one-tap-props) to see the full list of props available.

## Usage

```vue
<script setup>
import { GoogleOneTap } from 'vue-clerk'
</script>

<template>
  <GoogleOneTap />
</template>
```
