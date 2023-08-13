<script setup lang="ts">
import type { SignInProps } from '@clerk/types'
import { useClerk } from '../composables/useClerk'

const props = defineProps<SignInProps & {
  mode: 'modal' | 'redirect'
}>()

const clerk = useClerk()

function clickHandler() {
  const { mode, ...opts } = props

  if (mode === 'modal')
    return clerk.openSignIn(opts)

  return clerk.redirectToSignIn(opts)
}
</script>

<template>
  <button @click="clickHandler">
    <slot>
      Sign In
    </slot>
  </button>
</template>
