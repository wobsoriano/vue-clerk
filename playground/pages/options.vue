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
  <WithUser v-slot="{ isSignedIn, user }">
    <div v-if="isSignedIn">
      {{ user?.firstName ? `Hello, ${user.firstName}` : 'Hello there!' }}
    </div>
    <!-- <button v-else @click="$clerk.openSignIn">
      Sign In
    </button> -->
  </WithUser>
</template>
