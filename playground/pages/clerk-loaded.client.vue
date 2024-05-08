<script setup lang="ts">
import { ClerkLoaded, ClerkLoading } from 'vue-clerk'
</script>

<template>
  <ClerkLoaded>
    <Version />
  </ClerkLoaded>
  <ClerkLoading>
    Loading clerk...
  </ClerkLoading>
</template>
