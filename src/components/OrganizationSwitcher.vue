<script setup lang="ts">
import type { OrganizationSwitcherProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<OrganizationSwitcherProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.mountOrganizationSwitcher,
  unmountFn: clerk.unmountOrganizationSwitcher,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
