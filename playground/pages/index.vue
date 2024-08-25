<script setup lang="ts">
import { OrganizationSwitcher, SignInButton, SignOutButton, WithUser, updateClerkOptions, useAuth } from 'vue-clerk'
import { frFR } from '@clerk/localizations'

const { isSignedIn, isLoaded } = useAuth()

function updateLocale() {
  updateClerkOptions({
    localization: frFR,
  })
}
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
    <button @click="updateLocale">
      Switch locale
    </button>
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
