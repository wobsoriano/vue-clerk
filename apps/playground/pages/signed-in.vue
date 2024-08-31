<template>
  <section>
    <SignedOut>
      This content is always visible.
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <div>
        This content is visible only to
        signed in users.
      </div>
      <SignOutButton />
    </SignedIn>
  </section>
</template>
