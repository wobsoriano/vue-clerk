---
"vue-clerk": patch
---

feat: Add custom menu items to UserButton component

Example usage:

```vue
<template>
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Link label="Terms" href="/custom-pages">
        <template #labelIcon>
          <TermsIcon />
        </template>
      </UserButton.Link>
      <UserButton.Action label="Chat Modal" @click="openChatModal">
        <template #labelIcon>
          <ChatIcon />
        </template>
      </UserButton.Action>
    </UserButton.MenuItems>
  </UserButton>
</template>
```
