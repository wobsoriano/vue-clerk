<script setup lang="ts">
import { toReactive } from '@vueuse/core'
import { useSession } from '../composables/useSession'

// toReactive removes .value when accessing in template
const props = toReactive(useSession())
</script>

<template>
  <slot v-bind="props" />
</template>
