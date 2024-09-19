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
        <UserButton.Action label="Help" open="/help">
          <template #labelIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
            </svg>
          </template>
        </UserButton.Action>
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
