---
outline: deep
---

# UserButton

A component that allows users to manage their account, switch accounts, or sign out

## Overview

The `<UserButton/>` component is used to render the familiar user button UI popularized by Google.

## Usage

```vue
<script lang="ts">
import { SignInButton, UserButton, useAuth } from 'vue-clerk'

const { isSignedIn } = useAuth()
</script>

<template>
  <header>
    <h1>My App</h1>
    <UserButton v-if="isSignedIn" />
    <SignInButton v-else />
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

## Props

|Name|Type|Description|
|--- |--- |--- |
|appearance?|`Theme`|Controls the overall look and feel|
|showName?|`string`|Controls if the user name is displayed next to the user image button.|
|signInUrl?|`string`|The full URL or path to navigate to when the "Add another account" button is clicked.|
|userProfileMode|`"modal"` | "navigation"|Controls whether clicking the "Manage your account" button will cause the UserProfile component to open as a modal, or if the browser will navigate to the userProfileUrl where UserProfile is mounted as a page.|
|userProfileUrl?|`string`|The full URL or path leading to the user management interface.|
|afterSignOutUrl?|`string`|The full URL or path to navigate to after a signing out from all accounts (applies to both single-session and multi-session apps)|
|afterMultiSessionSingleSignOutUrl?|`string`|The full URL or path to navigate to after a signing out from currently active account (multisession apps) .|
|afterSwitchSessionUrl?|`string`|Full URL or path to navigate to after a successful account change (multi-session apps).|
|defaultOpen|`boolean`|Controls whether the `<UserButton/>` should open by default during the first render.|
|userProfileProps?|`userProfileProps`|Specify options for the underlying `<UserProfile />` component.e.g. <span v-pre>`<UserButton userProfileProps={{additionalOAuthScopes: {google: ['foo', 'bar'], github: ['qux']}}} />`</span>|


## Customization

The `<UserButton/>` component can be highly customized through the [appearance prop](https://clerk.com/docs/component-customization/appearance-prop).
