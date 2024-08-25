<script setup lang="ts">
import { UserButton } from 'vue-clerk'

function openChat() {
  console.log('Open chat')
}
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
            <div>H</div>
          </template>
        </UserButton.Link>
      </UserButton.MenuItems>
    </UserButton>
  </div>
</template>
