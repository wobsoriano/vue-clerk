---
outline: deep
---

# `<SignedOut />`

The `<SignedOut>` component offers authentication checks as a cross-cutting concern. Any child nodes wrapped by a `<SignedOut>` component will be rendered only if there's no User signed in to your application.

## Usage

```vue
<script setup>
import { SignedOut } from 'vue-clerk'
</script>

<template>
  <section>
    <div>
      This content is always visible.
    </div>
    <SignedOut>
      <div>
        This content is visible only to signed out users.
      </div>
    </SignedOut>
  </section>
</template>
```
