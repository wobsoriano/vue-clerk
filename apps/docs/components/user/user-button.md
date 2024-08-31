---
outline: deep
---

# `<UserButton />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Fuser-button.svg&w=1080&q=75" />

The `<UserButton />` component is used to render the familiar user button UI popularized by Google.

Clerk is the only provider with multi-session support, allowing users to sign into multiple accounts at once and switch between them. For multisession apps, the `<UserButton />` automatically supports instant account switching, without the need of a full page reload. For more information, you can check out the [Multi-session applications guide](https://clerk.com/docs/custom-flows/multi-session-applications#overview).

## Props

Click [here](https://clerk.com/docs/components/user/user-button#properties) to see the full list of props available.

## Usage

In the following example, `<UserButton />` is mounted inside a header component, which is a common pattern on many websites and applications. When the user is signed in, they will see their avatar and be able to open the popup menu.

```vue
<script setup>
import { SignInButton, SignedIn, SignedOut, UserButton } from 'vue-clerk'
</script>

<template>
  <header>
    <h1>My App</h1>
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton />
    </SignedOut>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20;
}
</style>
```
