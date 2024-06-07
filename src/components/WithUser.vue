<script setup lang="ts">
import { reactive } from 'vue'
import { useUser } from '../composables/useUser'

// reactive removes .value when accessing in template
const props = reactive(useUser())
</script>

<template>
  <slot v-bind="props" />
</template>
