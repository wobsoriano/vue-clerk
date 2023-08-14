<script setup lang="ts">
import { useClerk } from '../composables/useClerk'

const clerk = useClerk()
</script>

<template>
  <slot v-bind="clerk" />
</template>
