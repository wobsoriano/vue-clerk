---
outline: deep
---

# SignOutButton

`<SignOutButton/>` is a button that will sign a user out. By default, it is a `<button>` tag that says Sign Out, but it is completely customizable by passing children.

## Usage

```vue
<script lang="ts">
import { SignOutButton } from 'vue-clerk'
</script>

<template>
  <SignOutButton />
</template>
```

## Props

|Name|Type|Description|
|--- |--- |--- |
|signOutOptions?|SignOutOptions|Object that current has a `sessionId` property. The sessionId can be passed in to sign out a specific session, which is useful for multisession applications.|
