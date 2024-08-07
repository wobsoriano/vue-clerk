<script setup lang="ts">
import type { SignInProps } from '@clerk/types'
import { usePolymorphicRef } from '../composables/usePolymorphicRef'
import { useClerk } from '../composables/useClerk'

type SignInButtonProps = Pick<
  SignInProps,
    'fallbackRedirectUrl' | 'forceRedirectUrl' | 'signUpForceRedirectUrl' | 'signUpFallbackRedirectUrl'
>

const props = withDefaults(defineProps<SignInButtonProps & {
  mode?: 'modal' | 'redirect'
  asChild?: true | undefined
}>(), {
  asChild: undefined,
})
const { node, setRef } = usePolymorphicRef()

const clerk = useClerk()

function clickHandler() {
  const { mode, ...opts } = props

  if (mode === 'modal')
    return clerk.openSignIn(opts)

  return clerk.redirectToSignIn({
    ...opts,
    signInFallbackRedirectUrl: props.fallbackRedirectUrl,
    signInForceRedirectUrl: props.forceRedirectUrl,
  })
}
</script>

<template>
  <slot
    v-if="asChild"
    v-bind="{ ...$attrs, onClick: clickHandler, ref: setRef }"
  />
  <button v-else ref="node" data-testid="sign-in-btn" v-bind="$attrs" @click="clickHandler">
    <slot :handler="clickHandler">
      Sign in
    </slot>
  </button>
</template>
