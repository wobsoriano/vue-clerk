<script setup lang="ts">
import { ClerkLoaded } from 'vue-clerk';
import { OrganizationSwitcher, SignOutButton, WithUser, useAuth } from 'vue-clerk'

const { isSignedIn, isLoaded } = useAuth()

// onMounted(() => {
//   console.log(getCurrentInstance().setupState)
// })
</script>

<template>
  <h1>Hello Clerk!</h1>
  <div v-clerk />
  <OrganizationSwitcher :appearance="{ elements: { organizationPreviewTextContainer: 'hidden md:block', organizationSwitcherTriggerIcon: 'hidden md:block' } }" />
  <div v-if="!isLoaded">
    Loading auth..
  </div>
  <div v-else-if="isSignedIn">
    <!-- <UserButton /> -->
    <WithUser>
      <template #default="{ user }">
        <div v-if="isSignedIn">
          <p>Hello {{ user?.fullName }}!</p>
        </div>
        <div v-else>
          Loading...
        </div>
      </template>
    </WithUser>
    <SignOutButton />
  </div>
  <div v-else>
    <!-- <SignInButton mode="modal" /> -->
    <!-- <div v-clerk /> -->
  </div>
</template>
