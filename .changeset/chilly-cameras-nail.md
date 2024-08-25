---
"vue-clerk": minor
---

Add custom pages and links to `<UserProfile />` component

Usage:

```vue
<script setup>
import { UserProfile } from 'vue-clerk'
</script>

<template>
  <UserProfile>
    <UserProfile.Page label="Custom page" url="custom">
      <template #labelIcon>
        <CustomIcon />
      </template>
      <CustomPage />
    </UserProfile.Page>
  </UserProfile>
</template>
```
