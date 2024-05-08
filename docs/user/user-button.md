---
outline: deep
---

# `<UserButton />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Fuser-button.svg&w=1080&q=75" />

The `<UserButton />` component is used to render the familiar user button UI popularized by Google.

Clerk is the only provider with multi-session support, allowing users to sign into multiple accounts at once and switch between them. For multisession apps, the `<UserButton />` automatically supports instant account switching, without the need of a full page reload. For more information, you can check out the [Multi-session applications guide](https://clerk.com/docs/custom-flows/multi-session-applications#overview).

## Usage

```vue
<script setup>
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
|:----|:----|:----|
|`appearance`|[`Appearance`](https://clerk.com/docs/components/customization/overview) / `undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`showName`|`boolean`|Controls if the user name is displayed next to the user image button.|
|`signInUrl`|`string`|The full URL or path to navigate to when the "Add another account" button is clicked.|
|`userProfileMode`|`'modal' \|'navigation'`|Controls whether clicking the "Manage your account" button will cause the [`<UserProfile />`](/user/user-profile) component to open as a modal, or if the browser will navigate to the `userProfileUrl` where [`<UserProfile />`](/user/user-profile) is mounted as a page.Defaults to: `'modal'`.|
|`userProfileUrl`|`string`|The full URL or path leading to the user management interface.|
|`afterSignOutUrl`|`string`|The full URL or path to navigate to after a signing out from all accounts (applies to both single-session and multi-session apps).|
|`afterMultiSessionSingleSignOutUrl`|`string`|The full URL or path to navigate to after a signing out from currently active account (multisession apps).|
|`afterSwitchSessionUrl`|`string`|The full URL or path to navigate to after a successful account change (multi-session apps).|
|`defaultOpen`|`boolean`|Controls whether the `<UserButton />` should open by default during the first render.|
|`userProfileProps`|`object`|Specify options for the underlying [`<UserProfile />`](/user/user-profile) component. e.g. `{additionalOAuthScopes: {google: ['foo', 'bar'], github: ['qux']}}`.|

## Customization

The `<UserButton/>` component can be highly customized through the [appearance prop](https://clerk.com/docs/component-customization/appearance-prop).
