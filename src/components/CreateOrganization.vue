<script setup lang="ts">
import type { CreateOrganizationProps } from '@clerk/types'
import { ref } from 'vue'
import { useMountComponent } from '../composables/useMountComponent'
import { useClerk } from '../composables/useClerk'

const props = defineProps<CreateOrganizationProps>()
const el = ref<HTMLDivElement | null>(null)
const clerk = useClerk()

useMountComponent({
  el,
  mountFn: clerk.mountCreateOrganization,
  unmountFn: clerk.unmountCreateOrganization,
  props,
})
</script>

<template>
  <div ref="el" />
</template>
