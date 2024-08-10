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
      <UserButton.Link label="Terms" href="/custom-pages">
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
    </UserButton.MenuItems>
  </UserButton>
</template>
