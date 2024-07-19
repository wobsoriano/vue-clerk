---
outline: deep
---

# Custom Pages

While vue-clerk doesn't currently support declarative custom pages like its [React counterpart](https://clerk.com/docs/components/customization/user-profile#add-custom-pages-and-links-to-the-user-profile-component), you can still achieve custom pages using the `custom-pages` prop and Vue's built-in Teleport component.

```vue
<script setup lang="ts">
import { UserProfile } from 'vue-clerk'
import { shallowRef } from 'vue'

const customPageIcon = shallowRef(null)
const customPageContent = shallowRef(null)

const customPages: CustomPage[] = [
  {
    url: 'custom-page',
    label: 'Custom Page',
    mountIcon: (el) => {
      customPageIcon.value = el
    },
    unmountIcon: (el) => { /* cleanup */ },
    mount: (el) => {
      customPageContent.value = el
    },
    unmount: (el) => { /* cleanup */ },
  },
]
</script>

<template>
  <UserProfile :custom-pages="customPages" />

  <Teleport v-if="customPageIcon" :to="customPageIcon">
    <div>👋</div>
  </Teleport>

  <Teleport v-if="customPageContent" :to="customPageContent">
    <h1><b>Custom Page</b></h1>
    <p>This is the content of the custom page.</p>
  </Teleport>
</template>
```
