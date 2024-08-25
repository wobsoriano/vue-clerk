---
"vue-clerk": minor
---

Add custom pages and links to `<OrganizationProfile />` component

Usage:

```vue
<script setup>
import { OrganizationProfile } from 'vue-clerk'
</script>

<template>
  <OrganizationProfile>
    <OrganizationProfile.Page label="Custom page" url="custom">
      <template #labelIcon>
        <CustomIcon />
      </template>
      <CustomPage />
    </OrganizationProfile.Page>
  </OrganizationProfile>
</template>
```
