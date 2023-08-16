<script setup lang="ts">
import type { SignUpProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<SignUpProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.mountSignUp,
  unmountFn: clerk.unmountSignUp,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
