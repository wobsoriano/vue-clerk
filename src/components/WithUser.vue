<script setup lang="ts">
import { toReactive } from '@vueuse/core'
import { useUser } from '../composables/useUser'

// toReactive removes .value when accessing in template
const props = toReactive(useUser())
</script>

<template>
  <slot v-bind="props" />
</template>
