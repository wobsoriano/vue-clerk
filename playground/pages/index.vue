<script setup lang="ts">
import { SignInButton, UserProfile, useClerk } from 'vue-clerk'

const clerk = useClerk()
</script>

<template>
  <div>
    <SignInButton />
    <button @click="clerk.signOut()">
      Logout
    </button>
    <UserProfile />
  </div>
</template>
