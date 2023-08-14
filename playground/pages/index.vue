<script setup lang="ts">
import { SignIn, SignOutButton, UserProfile, useAuth } from 'vue-clerk'

const { isSignedIn, isLoaded } = useAuth()
</script>

<template>
  <div v-if="isLoaded">
    <div v-if="isSignedIn">
      <UserProfile />
      <SignOutButton />
    </div>
    <SignIn v-else />
  </div>
  <div v-else>
    Loading...
  </div>
</template>
