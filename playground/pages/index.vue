<script setup lang="ts">
import { OrganizationSwitcher, SignInButton, SignOutButton, WithUser, useAuth } from 'vue-clerk'

const { isSignedIn, isLoaded } = useAuth()
</script>

<template>
  <h1>Hello Clerk!</h1>
  <OrganizationSwitcher :appearance="{ elements: { organizationPreviewTextContainer: 'hidden md:block', organizationSwitcherTriggerIcon: 'hidden md:block' } }" />
  <div v-if="!isLoaded">
    Loading auth..
  </div>
  <div v-else-if="isSignedIn">
    <CustomUserButton />
    <WithUser>
      <template #default="{ user: user }">
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
    <SignInButton v-slot="props" as-child mode="modal">
      <button v-bind="props">
        Sign in baby
      </button>
    </SignInButton>
  </div>
</template>
