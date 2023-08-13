<script setup lang="ts">
import type { SignUpProps } from '@clerk/types'
import { onMounted, onUnmounted, ref } from 'vue'
import { useClerk } from '../composables/useClerk'

const props = defineProps<SignUpProps>()

const clerk = useClerk()

const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (el.value)
    clerk.mountSignUp(el.value, props)
})

onUnmounted(() => {
  if (el.value)
    clerk.unmountSignUp(el.value)
})
</script>

<template>
  <div ref="el" />
</template>
