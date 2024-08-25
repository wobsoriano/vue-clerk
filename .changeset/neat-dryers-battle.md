---
"vue-clerk": minor
---

Add custom page support in `<UserButton />` and improve menu items rendering

Usage:

```vue
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
