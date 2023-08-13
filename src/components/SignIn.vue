<script setup lang="ts">
import type { SignInProps } from '@clerk/types'
import { onMounted, onUnmounted, ref } from 'vue'
import { useClerk } from '../composables/useClerk'

const props = defineProps<SignInProps>()

const clerk = useClerk()

const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (el.value)
    clerk.mountSignIn(el.value, props)
})

onUnmounted(() => {
  if (el.value)
    clerk.unmountSignIn(el.value)
})
</script>

<template>
  <div ref="el" />
</template>
