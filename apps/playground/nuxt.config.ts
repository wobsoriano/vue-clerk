/* eslint-disable node/prefer-global/process */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['vue-clerk/nuxt'],

  clerk: {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  },

  compatibilityDate: '2024-07-26',
})
