<script setup lang="ts">
import { UserButton } from 'vue-clerk'
import type { CustomMenuItem } from '@clerk/types'

const customMenuItemIcon = ref<HTMLDivElement | null>(null)
const customMenuItems: CustomMenuItem[] = [
  {
    label: 'Open chat',
    mountIcon: (el) => {
      customMenuItemIcon.value = el
    },
    unmountIcon: () => { /* cleanup */ },
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert('init chat')
    },
  },
]
</script>

<template>
  <UserButton :custom-menu-items="customMenuItems" />
  <Teleport v-if="customMenuItemIcon" :to="customMenuItemIcon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  </Teleport>
</template>
