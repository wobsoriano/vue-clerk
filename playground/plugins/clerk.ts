import { clerkPlugin } from 'vue-clerk/plugin'

export default defineNuxtPlugin(async (nuxtApp) => {
  const publishableKey = useRuntimeConfig().public.clerkPublishableKey as string
  nuxtApp.vueApp.use(clerkPlugin, {
    publishableKey,
  })
})
