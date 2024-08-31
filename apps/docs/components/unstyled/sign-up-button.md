---
outline: deep
---

# `<SignUpButton />`

The `<SignUpButton>` component is a button that links to the sign-up page or displays the sign-up modal.

## Props

Click [here](https://clerk.com/docs/components/unstyled/sign-up-button#sign-up-button-properties) to see the full list of props available.

## Slots

|Name|Description|
|:----|:----|
|`default?`|children you want to wrap the `<SignUpButton>` in.|

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
    <SignUpButton v-slot="props" as-child>
      <button
        v-bind="props"
      >
        Sign up
      </button>
    </SignUpButton>
  </div>
</template>
```
