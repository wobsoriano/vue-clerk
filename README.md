# vue-clerk

Vue Clerk is the easiest way to add authentication and user management to your Vue application. Add sign up, sign in, and profile management to your application in minutes.

> [!WARNING]
> This unofficial package isn't connected to Clerk.com. It's a project designed to smoothly incorporate Clerk features into Vue applications.

## Installation

```bash
npm install vue-clerk
```

## Usage

Vue Clerk requires your application to have the [`clerkPlugin`](https://vue-clerk.vercel.app/getting-started.html#configure-plugin) installed.

If using Vite, set `VITE_CLERK_PUBLISHABLE_KEY` to your Publishable key in your `.env.local` file to make the environment variable accessible on `process.env` and pass it as the `publishableKey` prop.

```vue
<script setup lang="ts">
import { SignInButton, SignedIn, SignedOut, UserButton } from 'vue-clerk'
</script>

<template>
  <h1>Hello Clerk!</h1>
  <SignedIn>
    <UserButton after-sign-out-url="https://foo.bar" />
  </SignedIn>
  <SignedOut>
    <SignInButton mode="modal" />
  </SignedOut>
</template>
```

For further details and examples, please refer to the [Documentation](https://vue-clerk.vercel.app).

## License

MIT
