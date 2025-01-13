# vue-clerk

Vue Clerk is the easiest way to add authentication and user management to your Vue application. Add sign up, sign in, and profile management to your application in minutes.

> [!IMPORTANT]
> This project has graduated to an [official SDK](https://clerk.com/changelog/2025-01-07-vue-and-nuxt-sdk). Please proceed [here](https://clerk.com/docs/references/vue/migrating-from-vue-community-sdk) for migration instructions.

## Installation

```bash
npm install vue-clerk
```

## Usage

Vue Clerk requires your application to have the [`clerkPlugin`](https://vue-clerk.com/plugin) installed.

If using Vite, set `VITE_CLERK_PUBLISHABLE_KEY` to your Publishable key in your `.env.local` file to make the environment variable accessible on `process.env` and pass it as the `publishableKey` prop.

```vue
<script setup>
import { SignInButton, SignedIn, SignedOut, UserButton } from 'vue-clerk'
</script>

<template>
  <h1>Hello Clerk!</h1>
  <SignedIn>
    <UserButton />
  </SignedIn>
  <SignedOut>
    <SignInButton mode="modal" />
  </SignedOut>
</template>
```

For further details and examples, please refer to the [Documentation](https://vue-clerk.com).

## License

MIT
