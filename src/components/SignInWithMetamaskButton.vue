<script setup lang="ts">
import type { RedirectUrlProp } from '@clerk/types'
import { useClerk } from '../composables/useClerk'

const props = withDefaults(defineProps<RedirectUrlProp & {
  mode?: 'modal' | 'redirect'
}>(), {
  mode: 'redirect',
})

const clerk = useClerk()

function clickHandler() {
  async function authenticate() {
    await clerk.authenticateWithMetamask({ redirectUrl: props.redirectUrl || undefined })
  }
  void authenticate()
}
</script>

<template>
  <slot :handler="clickHandler">
    <button @click="clickHandler">
      Sign In with Metamask
    </button>
  </slot>
</template>
