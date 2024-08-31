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
   <div v-if="userId">Hello {{ userId }}</div>
   <div v-else>Not signed in</div>
 </template>
 ```
