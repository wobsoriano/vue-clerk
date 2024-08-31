---
"vue-clerk": minor
---

Add Nuxt module

Usage:

```js
export default defineNuxtConfig({
  modules: ['vue-clerk/nuxt'],
})
```

```vue
<script setup>
const user = useCurrentUser()
</script>

<template>
  <div v-if="user">
    Hello {{ user?.firstName }}
  </div>
  <div v-else>
    Not signed in
  </div>
</template>
```
