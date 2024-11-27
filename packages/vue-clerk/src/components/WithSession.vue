<script setup lang="ts">
import { deprecated } from '@clerk/shared/deprecated'
import { onMounted, reactive } from 'vue'
import { useSession } from '../composables/useSession'

// toReactive removes .value when accessing in template
const props = reactive(useSession())

onMounted(() => {
  deprecated('WithSession', 'Use the `useSession()` composable instead.')
})
</script>

<script lang="ts">
/**
 * @deprecated Use [`useSession()`](https://www.vue-clerk.com/composables/use-session) composable instead, will be removed in the next major version.
 */
export default {}
</script>

<template>
  <slot v-bind="props" />
</template>
