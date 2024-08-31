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
