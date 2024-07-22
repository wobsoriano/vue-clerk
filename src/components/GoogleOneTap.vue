<script setup lang="ts">
import type { GoogleOneTapProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<GoogleOneTapProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.openGoogleOneTap,
  unmountFn: clerk.closeGoogleOneTap,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
