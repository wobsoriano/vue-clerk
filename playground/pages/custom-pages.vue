<script setup lang="ts">
import { UserProfile } from 'vue-clerk'
import type { CustomPage } from '@clerk/types'

const customPageIcon = ref<HTMLDivElement | null>(null)
const customPageContent = ref<HTMLDivElement | null>(null)
const customPages: CustomPage[] = [
  {
    url: 'custom-page',
    label: 'Custom Page',
    mountIcon: (el) => {
      customPageIcon.value = el
    },
    unmountIcon: () => {
      // do clean up if needed
    },
    mount: (el) => {
      customPageContent.value = el
    },
    unmount: () => {
      // do clean up if needed
    },
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
