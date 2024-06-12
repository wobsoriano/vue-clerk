<script setup lang="ts">
import type { RedirectUrlProp } from '@clerk/types'
import { useClerk } from '../composables/useClerk'

const props = defineProps<RedirectUrlProp>()

const clerk = useClerk()

function clickHandler() {
  void clerk.authenticateWithMetamask({ redirectUrl: props.redirectUrl || undefined })
}
</script>

<template>
  <slot :handler="clickHandler">
    <button @click="clickHandler">
      Sign In with Metamask
    </button>
  </slot>
</template>
