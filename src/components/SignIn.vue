<script setup lang="ts">
import type { SignInProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'

const props = defineProps<SignInProps>()
const el = ref<HTMLDivElement | null>(null)

useMountComponent({
  el,
  mountKey: 'mountSignIn',
  unmountKey: 'unmountSignIn',
  props,
})
</script>

<template>
  <div ref="el" />
</template>
