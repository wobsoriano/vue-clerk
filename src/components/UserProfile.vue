<script setup lang="ts">
import type { UserProfileProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<UserProfileProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.mountUserProfile,
  unmountFn: clerk.unmountUserProfile,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
