---
outline: deep
---

# `<SignInButton />`

The `<SignInButton>` component is a button that links to the sign-in page or displays the sign-in modal.

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

In some cases you will want to use your own button, or button text. You can do that by wrapping your button up.

```vue
<script setup>
import { SignInButton } from 'vue-clerk'
</script>

<template>
  <div>
    <h1>Sign in</h1>
    <SignInButton>
      <button>Sign in with Clerk</button>
    </SignInButton>
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
