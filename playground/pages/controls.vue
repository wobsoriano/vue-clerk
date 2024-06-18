<script setup lang="ts">
import { SignInButton, SignedIn, SignedOut, UserButton } from 'vue-clerk'
</script>

<template>
  <h1>Hello Clerk!</h1>
  <SignedIn>
    <UserButton />
  </SignedIn>
  <SignedOut>
    <SignInButton mode="modal" />
  </SignedOut>
</template>
