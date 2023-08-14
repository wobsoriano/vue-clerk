---
outline: deep
---

<script setup>
import { SignUp, SignOutButton, useAuth } from '../../src'

const { isSignedIn } = useAuth()
</script>

# SignUp

A beautiful, high-conversion sign-up flow with your choice of required fields and social sign-up providers.

<SignOutButton v-if="isSignedIn" />
<div v-else style="margin-left: 65px; margin-top: 40px;">
  <SignUp redirect-url="/components/sign-up.html" />
</div>

## Usage

TODO
