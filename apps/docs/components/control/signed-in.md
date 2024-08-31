---
outline: deep
---

# `<SignedIn />`

The `<SignedIn>` component offers authentication checks as a cross-cutting concern. Any children components wrapped by a `<SignedIn>` component will be rendered only if there's a User with an active Session signed in your application.

## Usage

```vue
<script setup>
import { SignedIn } from 'vue-clerk'
</script>

<template>
  <section>
    <div>
      This content is always visible.
    </div>
    <SignedIn>
      <div>
        This content is visible only to
        signed in users.
      </div>
    </SignedIn>
  </section>
</template>
```
