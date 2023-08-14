<script setup lang="ts">
import type { UserProfileProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'

const props = defineProps<UserProfileProps>()
const el = ref<HTMLDivElement | null>(null)

useMountComponent({
  el,
  mountKey: 'mountUserProfile',
  unmountKey: 'unmountUserProfile',
  props,
})
</script>

<template>
  <div ref="el" />
</template>
