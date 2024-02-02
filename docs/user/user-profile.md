---
outline: deep
---

# `<UserProfile />`

<img src="https://clerk.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe1ql88v4%2Fproduction%2F86ce587f95cbaa773bdd9ddf8d5dfbb57387de16-528x645.svg%3Ffit%3Dmax%26auto%3Dformat&w=1080&q=75" alt="UserProfile component sample" />

The `<UserProfile />` component is used to render a beautiful, full-featured account management UI that allows users to manage their profile and security settings.

## Usage

```vue
<script setup>
import { UserProfile, useAuth } from 'vue-clerk'

const { isSignedIn } = useAuth()
</script>

<template>
  <UserProfile path="/user-profile" routing="path" />
</template>
```

## Props

|Name|Type|Description|
|:----|:----|:----|
|`appearance`|[`Appearance`](https://clerk.com/docs/components/customization/overview) / `undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`routing`|`'hash' \|'path' \|'virtual'`|The routing strategy for your pages.|
|`path`|`string`|The path where the component is mounted on when path-based routing is used e.g. /sign-in.|
|`additionalOAuthScopes`|`object`|Specify additional scopes per OAuth provider that your users would like to provide if not already approved. e.g. `{google: ['foo', 'bar'], github: ['qux']}`.|
