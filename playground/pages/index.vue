<script setup lang="ts">
import { SignInButton, UserButton, useAuth, useClerk } from 'vue-clerk'

const clerk = useClerk()
const { isSignedIn } = useAuth()
</script>

<template>
  <div>
    <SignInButton />
    <button v-if="isSignedIn" @click="clerk.signOut()">
      Logout
    </button>
    <UserButton v-if="isSignedIn" />
  </div>
</template>
