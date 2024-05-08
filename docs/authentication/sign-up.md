---
outline: deep
---

# `<SignUp />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Fsign-up.svg&w=1080&q=75" />

The `<SignUp />` component renders a UI for signing up users. The functionality of the `<SignUp />` component is controlled by the instance settings you specify in your [Clerk Dashboard](https://dashboard.clerk.com). You can further customize your `<SignUp />` component by passing additional properties at the time of rendering.

## Usage

Below is basic implementation of the `<SignUp />` component. You can use this as a starting point for your own implementation

```vue
<script>
import { SignUp } from 'vue-clerk'
</script>

<template>
  <SignUp />
</template>
```

## Props

|Name|Type|Description|
|:----|:----|:----|
|`appearance`|[`Appearance`](https://clerk.com/docs/components/customization/overview) / `undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`routing`|`'hash' \|'path' \|'virtual'`|The routing strategy for your pages.Note: If you are using environment variables for Next.js or Remix to specify your routes, this will be set to `path`.|
|`path`|`string`|The path where the component is mounted on when path-based routing is used e.g. /sign-up.|
|`redirectUrl`|`string`|Full URL or path to navigate to after successful sign in or sign up.The same as setting afterSignInUrl and afterSignUpUrl to the same value.|
|`afterSignInUrl`|`string`|The full URL or path to navigate to after a successful sign in.|
|`signInUrl`|`string`|Full URL or path to the sign in page. Use this property to provide the target of the 'Sign In' link that's rendered.|
|`afterSignUpUrl`|`string`|The full URL or path to navigate after a successful sign up.|
|`unsafeMetadata`|`object`|An object with the key and value for unsafeMetadata that will be saved to the user after sign up.E.g. `{ "company": "companyID1234" }`|
|`initialValues`|[`SignUpInitialValues`](https://clerk.com/docs/references/javascript/types/sign-up-initial-values)|The values used to prefill the sign-up fields with.|
