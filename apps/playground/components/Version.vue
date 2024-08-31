<script lang="ts">
export default defineComponent({
  name: 'Version',
  data: () => ({ version: '' }),
  mounted() {
    // @ts-expect-error: Add types later
    this.version = this.$clerk.version
  },
})
</script>

<template>
  Clerk version: {{ version }}
</template>
