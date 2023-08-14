<script setup lang="ts">
import { SignIn, UserProfile, useAuth, useClerk } from 'vue-clerk'

const clerk = useClerk()
const { isSignedIn } = useAuth()
</script>

<template>
  <div>
    <button v-if="isSignedIn" @click="clerk.signOut()">
      Logout
    </button>
    <SignIn v-if="!isSignedIn" />
    <UserProfile v-else />
  </div>
</template>
