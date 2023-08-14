<script setup lang="ts">
import type { SignUpProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'

const props = defineProps<SignUpProps>()
const el = ref<HTMLDivElement | null>(null)

useMountComponent({
  el,
  mountKey: 'mountSignUp',
  unmountKey: 'unmountSignUp',
  props,
})
</script>

<template>
  <div ref="el" />
</template>
