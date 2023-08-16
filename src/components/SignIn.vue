<script setup lang="ts">
import type { SignInProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<SignInProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.mountSignIn,
  unmountFn: clerk.unmountSignIn,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
