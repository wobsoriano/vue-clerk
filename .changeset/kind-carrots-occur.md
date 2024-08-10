---
"vue-clerk": patch
---

feat: Add custom menu items to UserButton component

Usage:

```vue
<template>
  <UserButton>
    <UserButton.Link label="Terms" href="/terms">
      <template #labelIcon>
        <TermsIcon />
      </template>
    </UserButton.Link>
    <UserButton.Action label="Chat Modal" @click="openChat">
      <template #labelIcon>
        <ChatIcon />
      </template>
    </UserButton.Action>
  </UserButton>
</template>
```
