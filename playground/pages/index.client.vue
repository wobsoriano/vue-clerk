<script setup lang="ts">
import { OrganizationSwitcher, SignInButton, SignOutButton, WithUser, useAuth, useClerkProvider } from 'vue-clerk'

const { isClerkLoaded } = useClerkProvider()
const { isSignedIn } = useAuth()
</script>

<template>
  <h1>Hello Clerk!</h1>
  <OrganizationSwitcher :appearance="{ elements: { organizationPreviewTextContainer: 'hidden md:block', organizationSwitcherTriggerIcon: 'hidden md:block' } }" />
  <div v-if="!isClerkLoaded">
    Loading auth..
  </div>
  <div v-else-if="isSignedIn">
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
    <SignOutButton />
  </div>
  <div v-else>
    <SignInButton mode="modal" />
  </div>
</template>
