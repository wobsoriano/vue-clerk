---
"vue-clerk": minor
---

Add custom page support in `<UserButton />` and improve menu items rendering

Usage:

```vue
<script setup>
import { UserButton } from 'vue-clerk'

function openChat() {
  alert('Open chat')
}
</script>

<template>
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Action label="Help" open="help">
        <template #labelIcon>
          <HelpIcon />
        </template>
      </UserButton.Action>
    </UserButton.MenuItems>
    <UserButton.UserProfilePage label="Help" url="help">
      <template #labelIcon>
        <HelpIcon />
      </template>
      <div>
        <h1>Help Page</h1>
        <p>This is the custom help page</p>
      </div>
    </UserButton.UserProfilePage>
  </UserButton>
</template>
```
