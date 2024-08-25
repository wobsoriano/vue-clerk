<script setup lang="ts">
import { UserProfile } from 'vue-clerk'
</script>

<template>
  <UserProfile>
    <UserProfile.Page label="Custom page" url="custom">
      <template #labelIcon>
        <div>👋</div>
      </template>
      <p>Here is the user profile content</p>
    </UserProfile.Page>
    <UserProfile.Link label="Homepage" url="/">
      <template #labelIcon>
        <div>👋</div>
      </template>
    </UserProfile.Link>
    <UserProfile.Page label="security" />
  </UserProfile>
</template>
