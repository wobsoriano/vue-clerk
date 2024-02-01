<script setup lang="ts">
import type { OrganizationListProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<OrganizationListProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.mountOrganizationList,
  unmountFn: clerk.unmountOrganizationList,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
