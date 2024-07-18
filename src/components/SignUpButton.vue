<script setup lang="ts">
import type { SignUpProps } from '@clerk/types'
import { usePolymorphicRef } from '../composables/usePolymorphicRef'
import { useClerk } from '../composables/useClerk'

const props = withDefaults(defineProps<SignUpProps & {
  mode?: 'modal' | 'redirect'
  asChild?: true | undefined
}>(), {
  mode: 'redirect',
  asChild: undefined,
})

const clerk = useClerk()
const { node, setRef } = usePolymorphicRef()

function clickHandler() {
  const { mode, ...opts } = props

  if (mode === 'modal')
    return clerk.openSignUp(opts)

  return clerk.redirectToSignUp(opts)
}
</script>

<template>
  <slot
    v-if="asChild"
    v-bind="{ ...$attrs, onClick: clickHandler, ref: setRef }"
  />
  <button v-else ref="node" data-testid="sign-up-btn" v-bind="$attrs" @click="clickHandler">
    <slot :handler="clickHandler">
      Sign up
    </slot>
  </button>
</template>
