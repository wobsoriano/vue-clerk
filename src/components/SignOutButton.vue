<script setup lang="ts">
import type { SignOutOptions } from '@clerk/types'
import { ref } from 'vue'
import { useClerk } from '../composables/useClerk'

const props = withDefaults(defineProps<{
  /**
   * Deprecated: Use `sessionId` and `redirectUrl` instead.
   */
  signOutOptions?: SignOutOptions
  sessionId?: string
  redirectUrl?: string
  asChild?: true | undefined
}>(), {
  asChild: undefined,
})

const emit = defineEmits(['signOut'])
const node = ref<HTMLElement | null>(null)
const setRef = (value: HTMLElement | null) => (node.value = value)

const clerk = useClerk()

function signOutCallback() {
  emit('signOut')
}

function clickHandler() {
  const signOutOptions = {
    redirectUrl: props.signOutOptions?.redirectUrl ?? props.redirectUrl,
    sessionId: props.signOutOptions?.sessionId ?? props.sessionId,
  }
  return clerk.signOut(signOutCallback, signOutOptions)
}
</script>

<template>
  <slot
    v-if="asChild"
    v-bind="{ ...$attrs, onClick: clickHandler, ref: setRef }"
  />
  <button v-else ref="node" data-testid="sign-out-btn" v-bind="$attrs" @click="clickHandler">
    <slot :handler="clickHandler">
      Sign out
    </slot>
  </button>
</template>
