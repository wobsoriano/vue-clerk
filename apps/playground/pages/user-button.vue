<script setup lang="ts">
import { UserButton } from 'vue-clerk'

function openChat() {
  // eslint-disable-next-line no-console
  console.log('Open chat')
}

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div>
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action label="Open chat" @click="openChat">
          <template #labelIcon>
            <div>C</div>
          </template>
        </UserButton.Action>
        <UserButton.Link label="Homepage" href="/">
          <template #labelIcon>
            <div>Ho</div>
          </template>
        </UserButton.Link>
      </UserButton.MenuItems>
      <UserButton.UserProfilePage label="Help" url="help">
        <template #labelIcon>
          <div>He</div>
        </template>
        <div>
          <h1>Help Page</h1>
          <p>This is the custom help page</p>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  </div>
</template>
