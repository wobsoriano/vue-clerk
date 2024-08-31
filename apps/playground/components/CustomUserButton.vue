<script setup lang="ts">
import { UserButton } from 'vue-clerk'

function openChatModal() {
  // eslint-disable-next-line no-console
  console.log('openChatModal')
}
</script>

<template>
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Link label="Custom pages" href="/custom-pages">
        <template #labelIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
          </svg>
        </template>
      </UserButton.Link>
      <UserButton.Action label="Chat Modal" @click="openChatModal">
        <template #labelIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
          </svg>
        </template>
      </UserButton.Action>
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
      </template>
      <div>
        <h1>Custom Terms Page</h1>
        <p>This is the custom terms page</p>
      </div>
    </UserButton.UserProfilePage>
  </UserButton>
</template>
