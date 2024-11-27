<script setup lang="ts">
import { deprecated } from '@clerk/shared/deprecated'
import { onMounted } from 'vue'
import { useClerk } from '../composables/useClerk'

const clerk = useClerk()

onMounted(() => {
  deprecated('WithClerk', 'Use the `useClerk()` composable instead.')
})
</script>

<script lang="ts">
/**
 * @deprecated Use [`useClerk()`](https://www.vue-clerk.com/composables/use-clerk) composable instead, will be removed in the next major version.
 */
export default {}
</script>

<template>
  <slot v-bind="clerk" />
</template>
