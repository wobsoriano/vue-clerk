---
outline: deep
---

# `<SignInButton />`

The `<SignInButton>` component is a button that links to the sign-in page or displays the sign-in modal.

## Props

Click [here](https://clerk.com/docs/components/unstyled/sign-in-button#sign-in-button-properties) to see the full list of props available.

## Slots

|Name|Description|
|:----|:----|
|`default?`|children you want to wrap the `<SignInButton>` in.|

## Usage

### Basic Usage

```vue
<script setup>
import { SignInButton } from 'vue-clerk'
</script>

<template>
  <SignInButton />
</template>
```

### Custom Usage

In some cases you will want to use your own button, or button text. You can do that by passing your own button as a child and passing the `handler` to the `click` event.

```vue
<script setup>
import { SignInButton } from 'vue-clerk'
</script>

<template>
  <div>
    <h1>Sign in</h1>
    <SignInButton v-slot="props" as-child>
      <button v-bind="props">
        Sign in with Clerk
      </button>
    </SignInButton>
  </div>
</template>
```
