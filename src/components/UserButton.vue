<script setup lang="ts">
import type { UserButtonProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<UserButtonProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.mountUserButton,
  unmountFn: clerk.unmountUserButton,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
