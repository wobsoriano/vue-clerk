<script lang="ts">
import { defineComponent } from 'vue'
import { WithUser } from 'vue-clerk'

export default defineComponent({
  components: {
    WithUser,
  },
})
</script>

<template>
  <WithUser v-slot="{ isLoaded, isSignedIn, user }">
    <div v-if="!isLoaded">
      Loading...
    </div>
    <div v-else-if="isSignedIn">
      <span>{{ user?.firstName ? `Hello, ${user.firstName}` : 'Hello there!' }}</span>
      <button @click="$clerk.signOut">
        Sign Out
      </button>
    </div>
    <button v-else @click="$clerk.openSignIn">
      Sign In
    </button>
  </WithUser>
</template>
