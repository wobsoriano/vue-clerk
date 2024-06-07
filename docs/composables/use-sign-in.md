---
outline: deep
---

# useSignIn()

Access the SignIn object inside of your components.

## Overview

The `useSignIn` composable gives you access to the [SignIn](https://clerk.com/docs/reference/clerkjs/signin) object inside your components.

You can use the methods of the `SignIn` object to create your own custom sign in flow, as an alternative to using Clerk's pre-built [<SignIn/>](/authentication/sign-in.html) component.

The `SignIn` object will also contain the state of the sign in attempt that is currently in progress, giving you the chance to examine all the details and act accordingly.

## Usage

Getting access to the [SignIn](https://clerk.com/docs/reference/clerkjs/signin) object from inside one of your components is easy. Note that the useSignIn composable can only be used if you installed the plugin.

The following example accesses the `SignIn` object to check the current sign in attempt's status.

```vue
<script>
import { useSignIn } from 'vue-clerk'

const { isLoaded, signIn } = useSignIn()
</script>

<template>
  <div v-if="isLoaded">
    The current sign in attempt status
    is {{ signIn.status }}.
  </div>
</template>
```

A more involved example follows below. In this example, we show an approach to create your own custom form for signing in your users.

```vue
<script setup>
import { ref } from 'vue'
import { useSignIn } from 'vue-clerk'

const { isLoaded, signIn, setActive } = useSignIn()

const email = ref('')
const password = ref('')

async function submit() {
  await signIn
    .value
    .create({
      identifier: email.value,
      password: password.value,
    })
    .then((result) => {
      if (result.status === 'complete') {
        console.log(result)
        setActive({ session: result.createdSessionId })
      }
      else {
        console.log(result)
      }
    })
    .catch(err => console.error('error', err.errors[0].longMessage))
}
</script>

<template>
  <form v-if="isLoaded" @submit.prevent="submit">
    <div>
      <label for="email">Email</label>
      <input v-model="email" type="email">
    </div>
    <div>
      <label for="password">Password</label>
      <input v-model="password" type="password">
    </div>
    <div>
      <button>Sign in</button>
    </div>
  </form>
</template>
```
