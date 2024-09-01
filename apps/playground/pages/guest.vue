<script setup>
definePageMeta({ middleware: 'guest', auth: { redirectUrl: '/user-button' } })
</script>

<template>
  <h1>Guest only</h1>
</template>
