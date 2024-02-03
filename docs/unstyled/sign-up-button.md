---
outline: deep
---

# `<SignUpButton />`

The `<SignUpButton>` component is a button that links to the sign-up page or displays the sign-up modal.

## Usage

### Basic Usage

```vue
<script setup>
import { SignUpButton } from 'vue-clerk'
</script>

<template>
  <div>
    <h1> Sign up </h1>
    <SignUpButton />
  </div>
</template>
```

### Custom Usage

In some cases you will want to use your own button, or button text. You can do that by passing your own button as a child and passing the `handler` to the `click` event.

```vue
<script setup>
import { SignUpButton } from 'vue-clerk'
</script>

<template>
  <div>
    <h1> Sign up </h1>
    <SignUpButton v-slot="{ handler }">
      <button @click="handler">
        Sign up
      </button>
    </SignUpButton>
  </div>
</template>
```

## Props

|Name|Type|Description|
|:----|:----|:----|
|`redirectUrl`|`string`|Full URL or path to navigate after successful sign in or sign up. The same as setting `afterSignInUrl` and `afterSignUpUrl` to the same value.|
|`afterSignInUrl`|`string`|The full URL or path to navigate after a successful sign in.|
|`afterSignUpUrl`|`string`|The full URL or path to navigate after a successful sign up.|
|`mode`|`'redirect' \|'modal'`|Determines what happens when a user clicks on the `<SignInButton>`. Setting this to `'redirect'` will redirect the user to the sign-in route. Setting this to `'modal'` will open a modal on the current route.Defaults to 'redirect'`|

## Slots

|Name|Description|
|:----|:----|
|`default?`|children you want to wrap the `<SignUpButton>` in.|
