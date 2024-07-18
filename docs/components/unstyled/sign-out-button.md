---
outline: deep
---

# `<SignOutButton />`

The `<SignOutButton>` component is a button that signs a user out. By default, it is a `<button>` tag that says Sign Out, but it is completely customizable by passing children.

## Props

Click [here](https://clerk.com/docs/components/unstyled/sign-out-button#sign-out-button-properties) to see the full list of props available.

## Slots

|Name|Description|
|:----|:----|
|`default?`|children you want to wrap the `<SignOutButton>` in.|

## Usage

### Basic Usage

```vue
<script setup>
import { SignOutButton } from 'vue-clerk'
</script>

<template>
  <div>
    <h1> Sign out </h1>
    <SignOutButton />
  </div>
</template>
```

### Custom Usage

In some cases you will want to use your own button, or button text. You can do that by passing your own button as a child and passing the `handler` to the `click` event.

```vue
<script setup>
import { SignOutButton } from 'vue-clerk'
</script>

<template>
  <div>
    <h1> Sign out </h1>
    <SignOutButton v-slot="props" as-child>
      <button v-bind="props">
        Sign out
      </button>
    </SignOutButton>
  </div>
</template>
```

### Multi-session usage

<br />

#### Sign out of all sessions

Clicking the `<SignOutButton>` component signs the user out of all sessions. This is the default behavior.

#### Sign out of a specific session

You can sign out of a specific session by passing in a `sessionId` to the `signOutOptions` prop. This is useful for signing a single account out of a multi-session (multiple account) application.

In the example below, the `sessionId` is retrieved from the [`useAuth()`](/composables/use-auth) composable. If the user is not signed in, the `sessionId` will be `null`, and the user is shown the `<SignInButton>` component. If the user is signed in, the user is shown the `<SignOutButton>` component, which when clicked, signs the user out of that specific session.

```vue
<script setup>
import { SignInButton, SignOutButton, useAuth } from 'vue-clerk'

const { sessionId } = useAuth()
</script>

<template>
  <div>
    <SignInButton v-if="!sessionId" />
    <SignOutButton v-else :sign-out-options="{ sessionId }" />
  </div>
</template>
```
