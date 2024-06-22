---
outline: deep
---

# `<SignUp />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Fsign-up.svg&w=1080&q=75" />

The `<SignUp />` component renders a UI for signing up users. The functionality of the `<SignUp />` component is controlled by the instance settings you specify in your [Clerk Dashboard](https://dashboard.clerk.com), such as [sign-in and sign-up options](https://clerk.com/docs/authentication/configuration/sign-up-sign-in-options) and [social connections](https://clerk.com/docs/authentication/social-connections/overview). You can further customize your `<SignUp />` component by passing additional properties at the time of rendering.

::: info
The `<SignUp/>` and `<SignIn/>` components cannot render when a user is already signed in, unless the application allows multiple sessions. If a user is already signed in and the application only allows a single session, Clerk will redirect the user to the Home URL instead.
:::

## Props

Click [here](https://clerk.com/docs/components/authentication/sign-up#properties) to see the full list of props available.

## Usage

Below is basic implementation of the `<SignUp />` component. You can use this as a starting point for your own implementation

```vue
<script>
import { SignUp } from 'vue-clerk'
</script>

<template>
  <SignUp path="/sign-up" />
</template>
```
