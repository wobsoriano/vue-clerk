---
"vue-clerk": minor
---

Add custom page support in `<UserButton />` and improve menu items rendering

Usage:

```vue
<script setup lang="ts">
import { UserButton } from 'vue-clerk'

function openChat() {
  alert('Open chat')
}
</script>

<template>
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Action label="Open chat" @click="openChat">
        <template #labelIcon>
          <ChatIcon />
        </template>
      </UserButton.Action>
    </UserButton.MenuItems>
  </UserButton>
</template>
```
