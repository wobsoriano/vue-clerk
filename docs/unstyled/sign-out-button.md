---
outline: deep
---

# `<SignOutButton />`

The `<SignOutButton>` component is a button that signs a user out. By default, it is a `<button>` tag that says Sign Out, but it is completely customizable by passing children.

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
    <SignOutButton v-slot="{ handler }">
      <button @click="handler">
        Sign out
      </button>
    </SignOutButton>
  </div>
</template>
```

### Multi-session usage

#### Sign out of a specific session

You can sign out of a specific session by passing in a `sessionId` to the `signOutOptions` prop. This is useful for signing a single account out of a multi-session (multiple account) application.

In the example below, the `sessionId` is retrieved from the [`useAuth()`](/composables/use-auth) composable.

```vue
<script setup>
import { SignInButton, SignOutButton, useAuth } from 'vue-clerk'

const { sessionId } = useAuth()
</script>

<template>
  <div>
    <h1>{{ sessionId ? 'Sign out' : 'Sign in' }}</h1>
    <SignOutButton v-if="sessionId" :sign-out-options="{ sessionId }" />
    <SignInButton v-else />
  </div>
</template>
```

Sign out of all sessions

#### Sign out of all sessions

You can sign out of all currently active sessions by passing a callback that returns the `signOut()` method to the signOutCallback prop. This is useful for signing out all currently active accounts from a multi-session (multiple account) application.

In the example below, the `signOut()` method is retrieved from the [`useClerk()`](/composables/use-clerk) composable.

```vue
<script setup>
import { SignOutButton, useClerk } from 'vue-clerk'

const { signOut } = useClerk()
</script>

<template>
  <div>
    <h1>Sign out</h1>
    <SignOutButton :sign-out-callback="signOut" />
  </div>
</template>
```

## Props

|Name|Type|Description|
|:----|:----|:----|
|`signOutCallback?`|`() => (void \|Promise<any>)`|A promise to handle after the sign out has successfully happened.|
|`signOutOptions?`|`SignOutOptions`|Object that has a `sessionId` property. The `sessionId` can be passed in to sign out a specific session, which is useful for multisession applications.|

## Slots

|Name|Description|
|:----|:----|
|`default?`|children you want to wrap the `<SignOutButton>` in.|
