<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

defineProps<{
  version: string
}>()

const el = ref<HTMLElement>()
const { height } = useElementSize(el)

watchEffect(() => {
  if (height.value) {
    document.documentElement.style.setProperty(
      '--vp-layout-top-height',
      `${height.value + 16}px`,
    )
  }
})
</script>

<template>
  <div ref="el" class="banner">
    <div class="text">
      🎉 This package has graduated to an official Clerk SDK! See the <a href="https://clerk.com/docs/references/vue/migrating-from-vue-community-sdk" target="_blank">migration guide</a>.
    </div>
  </div>
</template>

<style>
.banner-dismissed {
  --vp-layout-top-height: 0px !important;
}
html {
  --vp-layout-top-height: 88px;
}
@media (min-width: 375px) {
  html {
    --vp-layout-top-height: 64px;
  }
}
@media (min-width: 768px) {
  html {
    --vp-layout-top-height: 40px;
  }
}
</style>

<style scoped>
.banner-dismissed .banner {
  display: none;
}
.banner {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--vp-z-index-layout-top);
  padding: 8px;
  text-align: center;
  background: #383636;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
.text {
  flex: 1;
}
a {
  text-decoration: underline;
}
</style>
