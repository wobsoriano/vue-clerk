---
outline: deep
---

# Plugin

The plugin provides your application the active session and user context to Clerk's composables and other components.

## Usage

```ts{3,6-8}
import { createApp } from 'vue'
import App from './App.vue'
import { clerkPlugin } from 'vue-clerk'

const app = createApp(App)
app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY
})
app.mount('#app')
```

## Properties

|Name|Type|Description|
|:----|:----|:----|
|`afterMultiSessionSingleSignOutUrl`|`string`|The full URL or path to navigate to after a signing out from a currently active account in a multi-session app.|
|`afterSignOutUrl`|`string`|The full URL or path to navigate to after a successful sign-out.|
|`allowedRedirectOrigins?`|`Array<string \|RegExp>`|Optional array of domains used to validate against the query param of an auth redirect. If no match is made, the redirect is considered unsafe and the default redirect will be used with a warning passed to the console.|
|`appearance?`|[`Appearance`](https://clerk.com/docs/components/customization/overview) / `undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`clerkJSUrl?`|`string`|Define the URL that `vue-clerk` should hot-load `@clerk/clerk-js` from.|
|`clerkJSVariant?`|`string`|If your web application only uses Control components, you can set this value to `headless` and load a minimal ClerkJS bundle for optimal page performance.|
|`clerkJSVersion?`|`string`|Define the npm version for `@clerk/clerk-js`.|
|`domain?`|`string \| ((url: URL) => boolean)`|This option sets the domain of the satellite application. If your application is a satellite application, this option is required.|
|`isSatellite?`|`boolean \| ((url: URL) => boolean)`|This option defines that the application is a satellite application.|
|`localization`|[`Localization`](https://clerk.com/docs/components/customization/localization) / `undefined`|Optional object to localize your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`publishableKey`|`string`|Clerk publishable key for your instance. This can be found in your Clerk Dashboard on the [API Keys](https://dashboard.clerk.com/last-active?path=api-keys) page. |
|`routerPush?`|`(to: string) => Promise<unknown> \| void`|A function which takes the destination path as an argument and performs a "push" navigation.|
|`routerReplace?`|`(to: string) => Promise<unknown> \| void`|A function which takes the destination path as an argument and performs a "replace" navigation.|
|`signInFallbackRedirectUrl`|`string`|The fallback URL to redirect to after the user signs in, if there's no redirect_url in the path already. Defaults to `/`. It's recommended to use [the environment variable](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects) instead.|
|`signUpFallbackRedirectUrl`|`string`|The fallback URL to redirect to after the user signs up, if there's no redirect_url in the path already. Defaults to `/`. It's recommended to use [the environment variable](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects) instead.|
|`signInForceRedirectUrl`|`string`|If provided, this URL will always be redirected to after the user signs in. It's recommended to use [the environment variable](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects) instead.|
|`signUpForceRedirectUrl`|`string`|If provided, this URL will always be redirected to after the user signs up. It's recommended to use [the environment variable](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects) instead.|
|`signInUrl`|`string`| This url will be used for any redirects that might happen and needs to point to your primary application. This option is optional for production instances and required for development instances. It's recommended to use [the environment variable](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects) instead.|
|`signUpUrl`|`string`| This URL will be used for any redirects that might happen and needs to point to your primary application on the client-side. This option is optional for production instances and required for development instances. It's recommended to use [the environment variable](https://clerk.com/docs/deployments/clerk-environment-variables#sign-in-and-sign-up-redirects) instead.|
|`supportEmail?`|`string`|Optional support email for display in authentication screens. Will only affect [Clerk Components](https://clerk.com/docs/components/overview) and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`telemetry`|`false \| { disabled?: boolean; debug?: boolean }`|Controls whether or not Clerk will collect [telemetry data](https://clerk.com/docs/telemetry).|
