---
outline: deep
---

# useSignUp()

Access the SignUp object inside your components.

## Overview

The `useSignUp` composable gives you access to the [SignUp](https://clerk.com/docs/reference/clerkjs/signup) object inside your components.

You can use the methods of the `SignUp` object to create your own custom sign up flow, as an alternative to using Clerk's pre-built [<SignUp/>](/authentication/sign-up.html) component.

The `SignUp` object will also contain the state of the sign up attempt that is currently in progress, giving you the chance to examine all the details and act accordingly.

## Usage

Getting access to the [SignUp](https://clerk.com/docs/reference/clerkjs/signup) object from inside one of your components is easy. Note that the `useSignUp` composable can only be used if you installed the plugin.

The following example accesses the `SignUp` object to check the current sign up attempt's status.

```vue
<script setup>
import { useSignUp } from 'vue-clerk'

const { isLoaded, signUp } = useSignUp()
</script>

<template>
  <div v-if="isLoaded">
    The current sign up attempt status
    is {{ signUp.status }}.
  </div>
</template>
```

A more involved example follows below. In this example, we show an approach to create your own custom form for registering users.

```vue
<script setup>
import { ref } from 'vue'
import { useSignUp } from 'vue-clerk'

const { isLoaded, signUp, setActive } = useSignUp()

const email = ref('')
const password = ref('')

async function submit() {
  await signUp
    .value
    .create({
      emailAddress: email.value,
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
      <button>Sign Up</button>
    </div>
  </form>
</template>
```
