---
"vue-clerk": minor
---

Add Nuxt module

Usage:

 ```js
 export default defineNuxtConfig({
   modules: ["vue-clerk/nuxt"],
 });
 ```

 ```html
<script setup>
const { userId } = useAuth()
</script>

<template>
    <SignedIn>
        <h1>User id {{ userId }}</h1>
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
