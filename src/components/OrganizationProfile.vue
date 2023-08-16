<script setup lang="ts">
import type { OrganizationProfileProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<OrganizationProfileProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.mountOrganizationProfile,
  unmountFn: clerk.unmountOrganizationProfile,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
