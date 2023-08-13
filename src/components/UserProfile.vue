<script setup lang="ts">
import type { UserProfileProps } from '@clerk/types'
import { ref, watchPostEffect } from 'vue'
import { useClerk } from '../composables/useClerk'
import { useClerkProvide } from '../plugin'

const props = defineProps<UserProfileProps>()

const clerk = useClerk()
const { isClerkLoaded } = useClerkProvide()

const el = ref<HTMLDivElement | null>(null)

watchPostEffect((onInvalidate) => {
  if (el.value && isClerkLoaded.value)
    clerk.mountUserProfile(el.value, props)

  onInvalidate(() => {
    if (el.value)
      clerk.unmountUserProfile(el.value)
  })
})
</script>

<template>
  <div ref="el" />
</template>
