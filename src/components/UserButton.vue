<script setup lang="ts">
import type { UserButtonProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'

const props = defineProps<UserButtonProps>()
const el = ref<HTMLDivElement | null>(null)

useMountComponent({
  el,
  mountKey: 'mountUserButton',
  unmountKey: 'unmountUserButton',
  props,
})
</script>

<template>
  <div ref="el" />
</template>
