<script setup lang="ts">
import type { SignInProps } from '@clerk/types'
import { useClerk } from '../composables/useClerk'

const props = withDefaults(defineProps<SignInProps & {
  mode?: 'modal' | 'redirect'
}>(), {
  mode: 'redirect',
})

const clerk = useClerk()

function clickHandler() {
  const { mode, ...opts } = props

  if (mode === 'modal')
    return clerk.openSignIn(opts)

  return clerk.redirectToSignIn(opts)
}
</script>

<template>
  <button data-testid="sign-in-btn" @click="clickHandler">
    <slot>
      Sign In
    </slot>
  </button>
</template>
