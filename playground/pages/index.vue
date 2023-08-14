<script setup lang="ts">
import { SignInButton, WithUser, useAuth } from 'vue-clerk'

const { isSignedIn } = useAuth()
</script>

<template>
  <h1>Hello Clerk!</h1>
  <div v-if="isSignedIn">
    <!-- <UserButton /> -->
    <WithUser>
      <template #default="{ isLoaded, user }">
        <div v-if="isLoaded && isSignedIn">
          <p>Hello {{ user?.fullName }}!</p>
        </div>
        <div v-else>
          Loading...
        </div>
      </template>
    </WithUser>
  </div>
  <SignInButton v-else mode="modal" />
</template>
