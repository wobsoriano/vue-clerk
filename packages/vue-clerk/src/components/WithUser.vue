<script setup lang="ts">
import { deprecated } from '@clerk/shared/deprecated'
import { onMounted, reactive } from 'vue'
import { useUser } from '../composables/useUser'

// reactive removes .value when accessing in template
const props = reactive(useUser())

onMounted(() => {
  deprecated('WithUser', 'Use the `useUser()` composable instead.')
})
</script>

<script lang="ts">
/**
 * @deprecated Use [`useUser()`](https://www.vue-clerk.com/composables/use-user) composable instead, will be removed in the next major version.
 */
export default {}
</script>

<template>
  <slot v-bind="props" />
</template>
