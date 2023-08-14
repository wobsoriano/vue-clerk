<script setup lang="ts">
import { SignInButton, UserButton, useAuth } from 'vue-clerk'

const { isSignedIn } = useAuth()
const route = useRoute()
</script>

<template>
  <h1>Hello Clerk!</h1>
  <div v-if="isSignedIn">
    <UserButton :after-sign-out-url="route.fullPath" />
  </div>
  <SignInButton v-else mode="modal" />
</template>
