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
  <button @click="clickHandler">
    <slot>
      Sign Out
    </slot>
  </button>
</template>
