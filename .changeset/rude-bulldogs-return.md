---
"vue-clerk": patch
---

Allow condition for roles and permissions in route middleware

Usage:

```vue
<script setup>
definePageMeta({
  middleware: 'auth',
  auth: {
    condition: (has) => has({ role: 'org:admin' }) || has({ role: 'org:billing_manager' })
  }
})
</script>

<template>
  <p>Welcome, admin / billing manager.</p>
</template>
```
