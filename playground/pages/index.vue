<script setup lang="ts">
import { SignIn, SignOutButton, UserProfile, useAuth } from 'vue-clerk'

const { isSignedIn } = useAuth()
</script>

<template>
  <div v-if="isSignedIn">
    <UserProfile />
    <SignOutButton />
  </div>
  <SignIn v-else />
</template>
