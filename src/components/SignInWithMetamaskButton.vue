<script setup lang="ts">
import type { RedirectUrlProp } from '@clerk/types'
import { usePolymorphicRef } from '../composables/usePolymorphicRef'
import { useClerk } from '../composables/useClerk'

const props = withDefaults(defineProps<RedirectUrlProp & {
  asChild?: true | undefined
}>(), {
  asChild: undefined,
})
const { node, setRef } = usePolymorphicRef()

const clerk = useClerk()

function clickHandler() {
  void clerk.authenticateWithMetamask({ redirectUrl: props.redirectUrl || undefined })
}
</script>

<template>
  <slot
    v-if="asChild"
    v-bind="{ ...$attrs, onClick: clickHandler, ref: setRef }"
  />
  <button v-else ref="node" data-testid="sign-in-btn" v-bind="$attrs" @click="clickHandler">
    <slot :handler="clickHandler">
      Sign in with Metamask
    </slot>
  </button>
</template>
