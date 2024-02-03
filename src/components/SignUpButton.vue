<script setup lang="ts">
import type { SignUpProps } from '@clerk/types'
import { useClerk } from '../composables/useClerk'

const props = withDefaults(defineProps<SignUpProps & {
  mode?: 'modal' | 'redirect'
}>(), {
  mode: 'redirect',
})

const clerk = useClerk()

function clickHandler() {
  const { mode, ...opts } = props

  if (mode === 'modal')
    return clerk.openSignUp(opts)

  return clerk.redirectToSignUp(opts)
}
</script>

<template>
  <slot :handler="clickHandler">
    <button data-testid="sign-up-btn" @click="clickHandler">
      Sign Up
    </button>
  </slot>
</template>
