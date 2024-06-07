import { provideClerkToVueApp } from 'vue-clerk'

export default defineNuxtPlugin(async (nuxtApp) => {
  const publishableKey = useRuntimeConfig().public.clerkPublishableKey as string

  const clerk = provideClerkToVueApp(nuxtApp.vueApp, { publishableKey })

  await clerk.loadClerkJS()

  return {
    provide: {
      clerk,
    },
  }
})
