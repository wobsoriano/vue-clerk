// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['vue-clerk/nuxt'],

  clerk: {},

  compatibilityDate: '2024-07-26',
})
