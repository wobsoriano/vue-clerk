// @ts-expect-error: Nuxt imports
import { defineNuxtPlugin } from '#app'
// @ts-expect-error: Nuxt imports
import { useCurrentUser, useRequestFetch } from '#imports'

export default defineNuxtPlugin({
  name: 'clerk-current-user',
  enforce: 'pre',
  async setup() {
    async function fetchCurrentUser() {
      const requestFetch = useRequestFetch()

      useCurrentUser().value = await requestFetch('/api/_clerk/current-user', {
        retry: false,
      })
    }

    await fetchCurrentUser()
  },
})
