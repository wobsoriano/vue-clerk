---
outline: deep
---

# UserProfile

The `<UserProfile/>` component is used to render a beautiful, full-featured account management UI that allows users to manage their profile and security settings.

<img src="https://clerk.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe1ql88v4%2Fproduction%2F86ce587f95cbaa773bdd9ddf8d5dfbb57387de16-528x645.svg%3Ffit%3Dmax%26auto%3Dformat&w=1080&q=75" alt="UserProfile component sample" />

## Usage

```vue
<script lang="ts">
import { UserProfile, useAuth } from 'vue-clerk'

const { isSignedIn } = useAuth()
</script>

<template>
  <UserProfile v-if="isSignedIn" />
</template>
```

## Props

|Name|Type|Description|
|--- |--- |--- |
|appearance?|`Theme`|Controls the overall look and feel|
|routing?|`RoutingStrategy`|The routing strategy for your pages. Supported values are:<br>- hash (default): Hash based routing.<br>- path: Path based routing.<br>- virtual: Virtual based routing.|
|path?|`string`|The path where the component is mounted when path-based routing is used.<br>-e.g. /user-profile. This prop is ignored in hash and virtual based routing.|
|additionalOAuthScopes?|`Record<OAuthProvider, string[]>`|Specify additional scopes per OAuth provider that your users would be prompted to approve if not already done so e.g. <span v-pre>`<UserProfile additionalOAuthScopes={{google: ['foo', 'bar'], github: ['qux']}} />`</span>|
