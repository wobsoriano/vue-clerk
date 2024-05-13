---
outline: deep
---

# useSession()

Access the current Session object inside your components.

## Overview

The `useSession` composable accesses the current user [Session](https://clerk.com/docs/reference/clerkjs/session) object. It can be used to retrieve information about the session status. The `useSession` composable is a shortcut for retrieving the [Clerk.session](https://clerk.com/docs/reference/clerkjs/clerk#session) property.

As soon as a [User](https://clerk.com/docs/reference/clerkjs/user) signs in, we create a [Session](https://clerk.com/docs/reference/clerkjs/session) on the [Client](https://clerk.com/docs/reference/clerkjs/client) object. Only one session can be active on a single client, and that's exactly the session that is returned by the `useSession` composable.

The Session object returned from the composable will hold all state for the currently active session.

## Usage

The following example accesses the [Session](https://clerk.com/docs/reference/clerkjs/session) object in order to display how long a user has been active in this client session. Note that you can also get to the [User](https://clerk.com/docs/reference/clerkjs/user) object through the `useSession` composable.

```vue
<script setup>
import { useSession } from 'vue-clerk'

const { isLoaded, session } = useSession()
</script>

<template>
  <div v-if="isLoaded && session">
    This session has been active
    since {{ session.lastActiveAt }}.
  </div>
</template>
```
