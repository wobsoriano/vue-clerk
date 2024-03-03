---
outline: deep
---

# Plugin

The plugin provides your application the active session and user context to Clerk's composables and other components.

## Usage

::: warning
When using Nuxt, ensure that your plugin filenames are suffixed with `.client.js` or `.client.ts`. This practice ensures that Nuxt will load them only when Vue is mounted and ready on the client, preventing them from being loaded on the server side.:::

```ts
import { createApp } from 'vue'
import { clerkPlugin } from 'vue-clerk/plugin'

// or for headless mode:
// import { clerkPlugin } from 'vue-clerk/headless'

import App from './App.vue'

const app = createApp(App)

app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
})

app.mount('#app')
```

## Properties

|Name|Type|Description|
|:----|:----|:----|
|`publishableKey`|`string`|Clerk publishable key for your instance. This can be found in your Clerk Dashboard on the [API Keys](https://dashboard.clerk.com/last-active?path=api-keys) page. |
|`frontendApi`|`string`|The frontend API host for your instance. [API Keys](https://dashboard.clerk.com/last-active?path=api-keys) page. |
|`navigate?`|`(to: string) => Promise<unknown> \| void`|A function which takes the destination path as an argument and performs a "push" navigation.|
|`supportEmail?`|`string`|Optional support email for display in authentication screens. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`appearance?`|[`Appearance`](https://clerk.com/docs/components/customization/overview) / `undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`localization`|[`Localization`](https://clerk.com/docs/components/customization/localization) / `undefined`|Optional object to localize your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`allowedRedirectOrigins?`|`Array<string \|RegExp>`|Optional array of domains used to validate against the query param of an auth redirect. If no match is made, the redirect is considered unsafe and the default redirect will be used with a warning passed to the console.|
|`afterSignInUrl?`|`string`|The default URL to use after the user signs in.|
|`afterSignUpUrl?`|`string`|The default URL to use after the user signs up.|
|`isSatellite?`|`boolean \| ((url: URL) => boolean)`|This option defines that the application is a satellite application.|
|`domain?`|`string \| ((url: URL) => boolean)`|This option sets the domain of the satellite application. If your application is a satellite application, this option is required.|
|`signInUrl`|`string`|This url will be used for any redirects that might happen and needs to point to your primary application. This option is optional for production instances and required for development instances.|
