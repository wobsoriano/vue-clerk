<script setup lang="ts">
import { reactive } from 'vue'
import { useSession } from '../composables/useSession'

// toReactive removes .value when accessing in template
const props = reactive(useSession())
</script>

<template>
  <slot v-bind="props" />
</template>
