---
"vue-clerk": minor
---

Introduce Nuxt module

Usage:

 ```js
 export default defineNuxtConfig({
   modules: ['vue-clerk/nuxt'],
 });
 ```

 ```html
<script setup>
const { data: user } = await useCurrentUser()
</script>

<template>
    <SignedIn>
        <h1>Hello, {{ user?.fullName }}</h1>
        <UserButton />
    </SignedIn>
    <SignedOut>
        <SignInButton mode="modal" />
    </SignedOut>
</template>
```

```ts
// server/api/me.ts
export default eventHandler((event) => {
  const { userId } = getAuth(event)

  if (!userId) {
    setResponseStatus(event, 403)
    return
  }

  return clerkClient.users.getUser(userId)
})
```
