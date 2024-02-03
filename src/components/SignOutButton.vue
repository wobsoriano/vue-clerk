<script setup lang="ts">
import type { SignOutOptions } from '@clerk/types'
import { useClerk } from '../composables/useClerk'

const props = defineProps<{ signOutOptions?: SignOutOptions }>()
const emit = defineEmits(['signOut'])

const clerk = useClerk()

function signOutCallback() {
  emit('signOut')
}

function clickHandler() {
  return clerk.signOut(signOutCallback, props.signOutOptions)
}
</script>

<template>
  <slot :handler="clickHandler">
    <button data-testid="sign-out-btn" @click="clickHandler">
      Sign Out
    </button>
  </slot>
</template>
