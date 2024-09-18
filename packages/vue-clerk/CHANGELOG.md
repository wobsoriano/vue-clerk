# Changelog

## 0.6.13

### Patch Changes

- d662589: Allow condition for roles and permissions in route middleware

  Usage:

  ```vue
  <script setup>
  definePageMeta({
    middleware: "auth",
    auth: {
      condition: (has) =>
        has({ role: "org:admin" }) || has({ role: "org:billing_manager" }),
    },
  });
  </script>

  <template>
    <p>Welcome, admin / billing manager.</p>
  </template>
  ```

## 0.6.12

### Patch Changes

- 4844e22: Use built-in `updateRuntimeConfig` helper from `@nuxt/kit` and remove private metadata from initial state

## 0.6.11

### Patch Changes

- 4e7d66e: Remove `@clerk/shared` dependency in nuxt module

## 0.6.10

### Patch Changes

- 0f1bf29: Bump `@clerk/types` to 4.21.0 and `@clerk/shared` to 2.8.1

## 0.6.9

### Patch Changes

- 4a22b11: Add custom `<UserProfileLink />` to `<UserButton />`

## 0.6.8

### Patch Changes

- 4ebc2cc: Support roles and permissions in Nuxt middleware

  Examples:

  Allow users that have the `org:invoices:create` permission

  ```ts
  definePageMeta({
    middleware: "auth",
    auth: {
      permission: "org:invoices:create",
    },
  });
  ```

  Allow users with the `org:billing` role

  ```ts
  definePageMeta({
    middleware: "auth",
    auth: {
      role: "org:billing",
    },
  });
  ```

## 0.6.7

### Patch Changes

- 69fbbaa: Fix route middleware redirect urls

## 0.6.6

### Patch Changes

- 24337e2: Update redrect url property name for route middleware

## 0.6.5

### Patch Changes

- 8444c6e: Add Nuxt route middlewares for auth and guest pages

## 0.6.4

### Patch Changes

- b37a7dc: Recommend runtime config variables for the Nuxt module

## 0.6.3

### Patch Changes

- 1d757c7: Use recommended env vars for Clerk options

## 0.6.2

### Patch Changes

- fe0cee4: Update Nuxt plugin order to pre

## 0.6.1

### Patch Changes

- b5f3f07: Use publishable key from env variable inside Nuxt module

## 0.6.0

### Minor Changes

- 6c77ccb: Introduce Nuxt module

  Usage:

  ```js
  export default defineNuxtConfig({
    modules: ["vue-clerk/nuxt"],
  });
  ```

  ```html
  <script setup>
    const { data: user } = await useCurrentUser()
  </script>

  <template>
    <SignedIn>
      <h1>Hello, {{ user?.fullName }}</h1>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton mode="modal" />
    </SignedOut>
  </template>
  ```

  ```ts
  // server/api/me.ts
  export default eventHandler((event) => {
    const { userId } = getAuth(event);

    if (!userId) {
      setResponseStatus(event, 403);
      return;
    }

    return clerkClient.users.getUser(userId);
  });
  ```

## 0.5.1

### Patch Changes

- f526231: Fix `<UserButton />` component trying to account for custom menu items even when empty
- ffff2e4: Bump @clerk/shared to 2.5.3 and @clerk/types to 4.15.0

## 0.5.0

### Minor Changes

- 7863158: Add custom pages and links to `<UserProfile />` component

  Usage:

  ```vue
  <script setup>
  import { UserProfile } from "vue-clerk";
  </script>

  <template>
    <UserProfile>
      <UserProfile.Page label="Custom page" url="custom">
        <template #labelIcon>
          <CustomIcon />
        </template>
        <CustomPage />
      </UserProfile.Page>
    </UserProfile>
  </template>
  ```

- 4c5fcd8: Add custom page support in `<UserButton />` and improve menu items rendering

  Usage:

  ```vue
  <script setup>
  import { UserButton } from "vue-clerk";

  function openChat() {
    alert("Open chat");
  }
  </script>

  <template>
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action label="Help" open="help">
          <template #labelIcon>
            <HelpIcon />
          </template>
        </UserButton.Action>
      </UserButton.MenuItems>
      <UserButton.UserProfilePage label="Help" url="help">
        <template #labelIcon>
          <HelpIcon />
        </template>
        <div>
          <h1>Help Page</h1>
          <p>This is the custom help page</p>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  </template>
  ```

- f84f404: Add custom pages and links to `<OrganizationProfile />` component

  Usage:

  ```vue
  <script setup>
  import { OrganizationProfile } from "vue-clerk";
  </script>

  <template>
    <OrganizationProfile>
      <OrganizationProfile.Page label="Custom page" url="custom">
        <template #labelIcon>
          <CustomIcon />
        </template>
        <CustomPage />
      </OrganizationProfile.Page>
    </OrganizationProfile>
  </template>
  ```

## 0.4.21

### Patch Changes

- 562f4e9: Add helper function to update Clerk options

  Usage:

  ```ts
  import { updateClerkOptions } from "vue-clerk";
  import { frFR } from "@clerk/localizations";

  updateClerkOptions({
    localization: frFR,
    appearance: {
      elements: {
        formButtonPrimary: "bg-slate-500 hover:bg-slate-400 text-sm",
      },
    },
  });
  ```

## 0.4.20

### Patch Changes

- b1bc743: Improve calls to `addListener` in user-level

## 0.4.19

### Patch Changes

- be4aca9: Bump @clerk/types from 4.13.1 to 4.14.0
- 07c2d12: Bump @clerk/shared from 2.5.1 to 2.5.2

## 0.4.18

### Patch Changes

- a49e0be: Use Clerk JS script loader functions from @clerk/shared

## 0.4.17

### Patch Changes

- b291789: feat: Add custom menu items to UserButton component

  Example usage:

  ```vue
  <template>
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link label="Terms" href="/custom-pages">
          <template #labelIcon>
            <TermsIcon />
          </template>
        </UserButton.Link>
        <UserButton.Action label="Chat Modal" @click="openChatModal">
          <template #labelIcon>
            <ChatIcon />
          </template>
        </UserButton.Action>
      </UserButton.MenuItems>
    </UserButton>
  </template>
  ```

## 0.4.16

### Patch Changes

- 4d69257: chore(deps): bump @clerk/types from 4.12.1 to 4.13.0
- b215ddb: chore(deps): bump @clerk/shared from 2.4.5 to 2.5.0
- f43df06: fix: Temporary add unexported `Transferable` type

## 0.4.15

### Patch Changes

- 2f3603f: Bump @clerk/shared and @clerk/types versions

## 0.4.14

### Patch Changes

- 5a96cb7: Fix UI component props not mounting

## 0.4.13

### Patch Changes

- ca81318: Fix incorrect UI components mount and unmount functions
- 46a2203: Fix incorrect GoogleOneTap mount function

## 0.4.12

### Patch Changes

- 138596c: Clean up UI components and add compile-time tests
- b8ac6ae: Bump @clerk/shared to 2.4.1 and @clerk/types to 4.9.1"

## 0.4.11

### Patch Changes

- 85edb7f: Add GoogleOneTap component

## 0.4.10

### Patch Changes

- a040391: Add reusable polymorphic ref composable
- d00284c: Introduce unstyled polymorphic components

## 0.4.9

### Patch Changes

- 50327fc: Bump clerk dependencies

## 0.4.8

### Patch Changes

- 3a0a8f7: fix: vue-tsc typeerror on build

## 0.4.7

### Patch Changes

- cabee70: ci: fix release script

## 0.4.6

### Patch Changes

- 0142fb7: chore: remove unused error messages

## 0.4.5

### Patch Changes

- c23a20a: chore: add build:release script

## 0.4.4

### Patch Changes

- 191bebf: feat: add current org membership property to useOrganization composable

## v0.4.3

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.4.2...v0.4.3)

### 🏡 Chore

- Minify build and remove unused files ([3791178](https://github.com/wobsoriano/vue-clerk/commit/3791178))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.4.2

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.4.1...v0.4.2)

### 🏡 Chore

- Remove unnecessary type assertion ([deb1b34](https://github.com/wobsoriano/vue-clerk/commit/deb1b34))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.4.1

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.4.0...v0.4.1)

### 📖 Documentation

- Add useSessionList doc ([8d5f4e5](https://github.com/wobsoriano/vue-clerk/commit/8d5f4e5))

### 🏡 Chore

- Remove vueuse ([9e8e597](https://github.com/wobsoriano/vue-clerk/commit/9e8e597))
- Remove redundant type ([ad10082](https://github.com/wobsoriano/vue-clerk/commit/ad10082))
- Bump all non-major dependencies ([860ef5d](https://github.com/wobsoriano/vue-clerk/commit/860ef5d))
- Update initial state values ([86d8668](https://github.com/wobsoriano/vue-clerk/commit/86d8668))
- Use getOrCreateInstance method when instantiating clerk ([2752281](https://github.com/wobsoriano/vue-clerk/commit/2752281))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.4.0

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.8...v0.4.0)

### 🚀 Enhancements

- Add telemetry calls for auth composables ([e1bff03](https://github.com/wobsoriano/vue-clerk/commit/e1bff03))
- Add SignInWithMetamaskButton ([3d7e51d](https://github.com/wobsoriano/vue-clerk/commit/3d7e51d))

### 📖 Documentation

- Add redirect to sign in and sign up props ([c4e0462](https://github.com/wobsoriano/vue-clerk/commit/c4e0462))
- Add links to initialValues ([e5b784d](https://github.com/wobsoriano/vue-clerk/commit/e5b784d))
- Update plugin usage ([20b7467](https://github.com/wobsoriano/vue-clerk/commit/20b7467))
- Update plugin options ([a1c11ed](https://github.com/wobsoriano/vue-clerk/commit/a1c11ed))

### 🏡 Chore

- Hot load clerk from CDN ([e62b9c9](https://github.com/wobsoriano/vue-clerk/commit/e62b9c9))
- ⚠️ Migrate to isomorphic clerk ([e721f16](https://github.com/wobsoriano/vue-clerk/commit/e721f16))
- Export IsomorphicClerkOptions ([88514d3](https://github.com/wobsoriano/vue-clerk/commit/88514d3))
- **provideClerkToApp:** Rename to provideClerkToVueApp ([74bbf98](https://github.com/wobsoriano/vue-clerk/commit/74bbf98))
- Bump @clerk/shared to 2.2.2 ([ee93a88](https://github.com/wobsoriano/vue-clerk/commit/ee93a88))
- Bump @clerk/types to 4.6.0 ([926f9ef](https://github.com/wobsoriano/vue-clerk/commit/926f9ef))
- Bump @vueuse/core to 10.10.0 ([5540309](https://github.com/wobsoriano/vue-clerk/commit/5540309))
- Bump all non-major dependencies ([37638d6](https://github.com/wobsoriano/vue-clerk/commit/37638d6))
- Use typed injection key with Symbol ([9e7912b](https://github.com/wobsoriano/vue-clerk/commit/9e7912b))

#### ⚠️ Breaking Changes

- ⚠️ Migrate to isomorphic clerk ([e721f16](https://github.com/wobsoriano/vue-clerk/commit/e721f16))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.8

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.7...v0.3.8)

### 🏡 Chore

- Export injection key ([e8a8388](https://github.com/wobsoriano/vue-clerk/commit/e8a8388))
- Deprecate provideClerkToApp in favor of provideClerkToVueApp ([0751426](https://github.com/wobsoriano/vue-clerk/commit/0751426))
- Bump @clerk/clerk-js to 5.5.3 ([7af45cc](https://github.com/wobsoriano/vue-clerk/commit/7af45cc))
- Bump @clerk/types to 4.5.1 ([eb576f9](https://github.com/wobsoriano/vue-clerk/commit/eb576f9))
- Bump @vueuse/core to 10.10.0 ([c8ab9cf](https://github.com/wobsoriano/vue-clerk/commit/c8ab9cf))
- Bump all non-major dependencies ([3dc38c8](https://github.com/wobsoriano/vue-clerk/commit/3dc38c8))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.7

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.6...v0.3.7)

### 🏡 Chore

- Fix condition for redirecting to sign-in page after sign-out ([02e224e](https://github.com/wobsoriano/vue-clerk/commit/02e224e))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.6

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.5...v0.3.6)

### 🏡 Chore

- Rename internal clerk provider ([c55ad64](https://github.com/wobsoriano/vue-clerk/commit/c55ad64))
- Stricter composable type returns ([4fe35e0](https://github.com/wobsoriano/vue-clerk/commit/4fe35e0))
- Stricter composable type returns ([cd9e0b3](https://github.com/wobsoriano/vue-clerk/commit/cd9e0b3))
- Add internal initialState support ([ee84ece](https://github.com/wobsoriano/vue-clerk/commit/ee84ece))
- Update provided values ([16dd0b4](https://github.com/wobsoriano/vue-clerk/commit/16dd0b4))
- Bump @clerk/clerk-js to 5.2.4 ([6c5c54b](https://github.com/wobsoriano/vue-clerk/commit/6c5c54b))
- Bump @clerk/types to 4.2.1 ([fc2d1d8](https://github.com/wobsoriano/vue-clerk/commit/fc2d1d8))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.5

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.4...v0.3.5)

### 🏡 Chore

- Update clerk provider internals ([0165033](https://github.com/wobsoriano/vue-clerk/commit/0165033))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.4

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.3...v0.3.4)

### 📖 Documentation

- Update plugin options ([6716925](https://github.com/wobsoriano/vue-clerk/commit/6716925))

### 🏡 Chore

- Update clerk provider internals ([c39539a](https://github.com/wobsoriano/vue-clerk/commit/c39539a))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.3

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.2...v0.3.3)

### 🏡 Chore

- Add function to create clerk instance without loading ([9c3b886](https://github.com/wobsoriano/vue-clerk/commit/9c3b886))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.2

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.1...v0.3.2)

### 🏡 Chore

- Add option to pass custom Clerk instance ([1cd57b6](https://github.com/wobsoriano/vue-clerk/commit/1cd57b6))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.1

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.3.0...v0.3.1)

### 🏡 Chore

- Export createClerkInstance for outside use ([ab21621](https://github.com/wobsoriano/vue-clerk/commit/ab21621))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.3.0

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.2.3...v0.3.0)

### 📖 Documentation

- Fix plugin usage warning block ([4a8e5fb](https://github.com/wobsoriano/vue-clerk/commit/4a8e5fb))
- New UI design screenshots ([8da2cf4](https://github.com/wobsoriano/vue-clerk/commit/8da2cf4))

### 🏡 Chore

- Bump @clerk/clerk-js to 5.2.1 ([1be0864](https://github.com/wobsoriano/vue-clerk/commit/1be0864))
- Bump @clerk/types to 4.2.0 ([b885e3a](https://github.com/wobsoriano/vue-clerk/commit/b885e3a))
- ⚠️ Remove setSession function from useSessionList ([422b242](https://github.com/wobsoriano/vue-clerk/commit/422b242))
- ⚠️ Remove setSession function from useSignIn ([dd8f112](https://github.com/wobsoriano/vue-clerk/commit/dd8f112))
- Export Clerk class ([704619a](https://github.com/wobsoriano/vue-clerk/commit/704619a))

### ✅ Tests

- Remove node 16 support ([f4c7eb0](https://github.com/wobsoriano/vue-clerk/commit/f4c7eb0))

#### ⚠️ Breaking Changes

- ⚠️ Remove setSession function from useSessionList ([422b242](https://github.com/wobsoriano/vue-clerk/commit/422b242))
- ⚠️ Remove setSession function from useSignIn ([dd8f112](https://github.com/wobsoriano/vue-clerk/commit/dd8f112))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.2.3

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.2.2...v0.2.3)

### 🚀 Enhancements

- **docs:** Add reminder for Nuxt plugin filename suffix ([c6c03bb](https://github.com/wobsoriano/vue-clerk/commit/c6c03bb))

### ❤️ Contributors

- Jeremy Auvray ([@jeremy93-2008](http://github.com/jeremy93-2008))

## v0.2.2

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.2.1...v0.2.2)

### 🏡 Chore

- Export plugin type ([7845379](https://github.com/wobsoriano/vue-clerk/commit/7845379))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.2.1

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.2.0...v0.2.1)

### 📦 Build

- **deps:** Bump @clerk/clerk-js to 4.71.2 ([049f068](https://github.com/wobsoriano/vue-clerk/commit/049f068))
- **deps:** Bump @clerk/types to 3.63.0 ([a1dec6f](https://github.com/wobsoriano/vue-clerk/commit/a1dec6f))
- **deps:** Bump @vueuse/core to 10.9.0 ([5e22dbc](https://github.com/wobsoriano/vue-clerk/commit/5e22dbc))

### 🏡 Chore

- Remove unused ts-expect-error ([6636af6](https://github.com/wobsoriano/vue-clerk/commit/6636af6))
- Update vitest config extension ([fed00e7](https://github.com/wobsoriano/vue-clerk/commit/fed00e7))

### 🎨 Styles

- Eslint fix ([947cd7c](https://github.com/wobsoriano/vue-clerk/commit/947cd7c))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.2.0

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.1.7...v0.2.0)

### 📖 Documentation

- Add plugin usage ([2c9555d](https://github.com/wobsoriano/vue-clerk/commit/2c9555d))
- Add plugin usage ([04cfb3d](https://github.com/wobsoriano/vue-clerk/commit/04cfb3d))

### 🏡 Chore

- ⚠️ Update plugin options to match react provider ([345b93e](https://github.com/wobsoriano/vue-clerk/commit/345b93e))
- ⚠️ Update plugin options to match react provider ([8868e0e](https://github.com/wobsoriano/vue-clerk/commit/8868e0e))

#### ⚠️ Breaking Changes

- ⚠️ Update plugin options to match react provider ([345b93e](https://github.com/wobsoriano/vue-clerk/commit/345b93e))
- ⚠️ Update plugin options to match react provider ([8868e0e](https://github.com/wobsoriano/vue-clerk/commit/8868e0e))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.1.7

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.1.6...v0.1.7)

### 🚀 Enhancements

- Add RedirectToCreateOrganization component ([54457e3](https://github.com/wobsoriano/vue-clerk/commit/54457e3))
- Add RedirectToOrganizationProfile component ([54bb999](https://github.com/wobsoriano/vue-clerk/commit/54bb999))

### 📖 Documentation

- Add more control component docs ([d1bd60e](https://github.com/wobsoriano/vue-clerk/commit/d1bd60e))
- Add links to more control components ([834d806](https://github.com/wobsoriano/vue-clerk/commit/834d806))
- Add sponsor link ([9995014](https://github.com/wobsoriano/vue-clerk/commit/9995014))

### 📦 Build

- **deps:** Bump @clerk/clerk-js to 4.69.0 ([5fdb922](https://github.com/wobsoriano/vue-clerk/commit/5fdb922))

### 🏡 Chore

- Remove unused import ([908ceab](https://github.com/wobsoriano/vue-clerk/commit/908ceab))
- Convert properties to computed refs ([7c0e719](https://github.com/wobsoriano/vue-clerk/commit/7c0e719))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.1.6

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.1.5...v0.1.6)

### 🚀 Enhancements

- Initial organization composable impl ([e710d2d](https://github.com/wobsoriano/vue-clerk/commit/e710d2d))

### 🩹 Fixes

- Export missing components ([76e6655](https://github.com/wobsoriano/vue-clerk/commit/76e6655))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.1.5

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.1.4...v0.1.5)

## v0.1.4

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.1.3...v0.1.4)

### 🩹 Fixes

- Component mount check ([f554bf1](https://github.com/wobsoriano/vue-clerk/commit/f554bf1))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.1.3

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.1.2...v0.1.3)

### 🚀 Enhancements

- Add organization list component ([e5a156f](https://github.com/wobsoriano/vue-clerk/commit/e5a156f))
- Add <Protect /> component ([a0b2077](https://github.com/wobsoriano/vue-clerk/commit/a0b2077))

### 📖 Documentation

- Add <Protect /> component doc ([b99f1f8](https://github.com/wobsoriano/vue-clerk/commit/b99f1f8))

### 📦 Build

- **deps:** Bump @clerk/clerk-js to 4.68.6 ([4878cde](https://github.com/wobsoriano/vue-clerk/commit/4878cde))

### 🎨 Styles

- Eslint fixes ([f24e435](https://github.com/wobsoriano/vue-clerk/commit/f24e435))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.1.2

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.1.1...v0.1.2)

## v0.1.1

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.1.0...v0.1.1)

### 🚀 Enhancements

- Export clerk provider composable ([54cfc3f](https://github.com/wobsoriano/vue-clerk/commit/54cfc3f))
- Export clerk provider composable ([8f636cf](https://github.com/wobsoriano/vue-clerk/commit/8f636cf))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.1.0

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.12...v0.1.0)

### 🚀 Enhancements

- ⚠️ Add headless support for lesser build size ([3b6d82c](https://github.com/wobsoriano/vue-clerk/commit/3b6d82c))

### 📖 Documentation

- Add headless plugin support ([3d0741f](https://github.com/wobsoriano/vue-clerk/commit/3d0741f))
- Fix plugin import ([c3d6a24](https://github.com/wobsoriano/vue-clerk/commit/c3d6a24))

### 📦 Build

- **deps:** Set vue peer dep to ^3.2.0 ([a02d4b0](https://github.com/wobsoriano/vue-clerk/commit/a02d4b0))
- **deps:** Bump @clerk/clerk-js to 4.64.2 ([ced81d9](https://github.com/wobsoriano/vue-clerk/commit/ced81d9))
- **deps:** Bump @clerk/types to 3.57.1 ([98c814d](https://github.com/wobsoriano/vue-clerk/commit/98c814d))

### 🎨 Styles

- Use flat eslint config ([0602126](https://github.com/wobsoriano/vue-clerk/commit/0602126))

#### ⚠️ Breaking Changes

- ⚠️ Add headless support for lesser build size ([3b6d82c](https://github.com/wobsoriano/vue-clerk/commit/3b6d82c))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.0.12

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.11...v0.0.12)

### 🚀 Enhancements

- **deps:** Bump @clerk/clerk-js to 4.57.0 ([71177bc](https://github.com/wobsoriano/vue-clerk/commit/71177bc))
- **deps:** Bump @clerk/types to 3.51.0 ([5605b04](https://github.com/wobsoriano/vue-clerk/commit/5605b04))
- Use headless version of clerk ([40e65e3](https://github.com/wobsoriano/vue-clerk/commit/40e65e3))

### 📖 Documentation

- Fix typo ([2560f3c](https://github.com/wobsoriano/vue-clerk/commit/2560f3c))

### 📦 Build

- **deps:** Bump @clerk/clerk-js to 4.62.1 ([1c282b9](https://github.com/wobsoriano/vue-clerk/commit/1c282b9))
- **deps:** Bump @clerk/types to 3.56.1 ([a25efdd](https://github.com/wobsoriano/vue-clerk/commit/a25efdd))
- **deps:** Bump @vueuse/core to 10.5.0 ([b0f466c](https://github.com/wobsoriano/vue-clerk/commit/b0f466c))

### 🏡 Chore

- Bump local deps ([73bc8c2](https://github.com/wobsoriano/vue-clerk/commit/73bc8c2))

### 🤖 CI

- Remove node 14 ([98dd34e](https://github.com/wobsoriano/vue-clerk/commit/98dd34e))
- Remove windows ([9229467](https://github.com/wobsoriano/vue-clerk/commit/9229467))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))
- Nicolas Hedger

## v0.0.11

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.10...v0.0.11)

### 🚀 Enhancements

- **deps:** Bump @clerk/clerk-js to 4.56.1 ([34f8a60](https://github.com/wobsoriano/vue-clerk/commit/34f8a60))
- **deps:** Bump @clerk/types to 3.50.0 ([401345d](https://github.com/wobsoriano/vue-clerk/commit/401345d))
- **deps:** Bump @vueuse/core to 10.4.1 ([6304803](https://github.com/wobsoriano/vue-clerk/commit/6304803))

### 💅 Refactors

- Reuse provider composable in control components ([723eccf](https://github.com/wobsoriano/vue-clerk/commit/723eccf))

### 📖 Documentation

- Add control component docs ([8fe2771](https://github.com/wobsoriano/vue-clerk/commit/8fe2771))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.0.10

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.9...v0.0.10)

### 🚀 Enhancements

- Add Organization components ([33a6388](https://github.com/wobsoriano/vue-clerk/commit/33a6388))

### 💅 Refactors

- Pass mount and unmount functions to mount composable instead ([e088ef6](https://github.com/wobsoriano/vue-clerk/commit/e088ef6))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.0.9

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.8...v0.0.9)

### 🚀 Enhancements

- Export clerk provider composable ([af20c9f](https://github.com/wobsoriano/vue-clerk/commit/af20c9f))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.0.8

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.7...v0.0.8)

### 🚀 Enhancements

- Add property for Options API users ([b4974ca](https://github.com/wobsoriano/vue-clerk/commit/b4974ca))
- Add SignUpButton ([91eec95](https://github.com/wobsoriano/vue-clerk/commit/91eec95))
- Allow clerk options to be passed in plugin installation ([9060ca2](https://github.com/wobsoriano/vue-clerk/commit/9060ca2))

### 📖 Documentation

- Update WithUser example ([6771bc5](https://github.com/wobsoriano/vue-clerk/commit/6771bc5))
- Add link to changelog ([2943475](https://github.com/wobsoriano/vue-clerk/commit/2943475))
- Add last updated and edit links ([cdc1182](https://github.com/wobsoriano/vue-clerk/commit/cdc1182))
- Add footer ([eef2c3e](https://github.com/wobsoriano/vue-clerk/commit/eef2c3e))
- Fix missing setup ([2993363](https://github.com/wobsoriano/vue-clerk/commit/2993363))

### ✅ Tests

- Add test config and initial test ([64302ef](https://github.com/wobsoriano/vue-clerk/commit/64302ef))
- Add sign out button test ([ea77dab](https://github.com/wobsoriano/vue-clerk/commit/ea77dab))
- Fix sign out button description name ([6bf1276](https://github.com/wobsoriano/vue-clerk/commit/6bf1276))
- Update sign in btn test ([cfcf08f](https://github.com/wobsoriano/vue-clerk/commit/cfcf08f))
- Move test files ([2823d06](https://github.com/wobsoriano/vue-clerk/commit/2823d06))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.0.7

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.6...v0.0.7)

### 🚀 Enhancements

- Add WithClerk HOC ([40463d1](https://github.com/wobsoriano/vue-clerk/commit/40463d1))
- Add WithSession HOC ([627d288](https://github.com/wobsoriano/vue-clerk/commit/627d288))
- Add control components ([c7fdac7](https://github.com/wobsoriano/vue-clerk/commit/c7fdac7))

### 📖 Documentation

- Fix user-button style sample ([3fbc9d7](https://github.com/wobsoriano/vue-clerk/commit/3fbc9d7))
- Remove sessionId in sign in ([78a4690](https://github.com/wobsoriano/vue-clerk/commit/78a4690))
- Add .value to samples ([9b55ed7](https://github.com/wobsoriano/vue-clerk/commit/9b55ed7))
- Add initial sign in and up component usage ([0026511](https://github.com/wobsoriano/vue-clerk/commit/0026511))
- Update index features ([63fa2f8](https://github.com/wobsoriano/vue-clerk/commit/63fa2f8))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.0.6

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.5...v0.0.6)

### 🚀 Enhancements

- Add WithUser HOC ([eca8c05](https://github.com/wobsoriano/vue-clerk/commit/eca8c05))

### 📖 Documentation

- Update readme ([478179c](https://github.com/wobsoriano/vue-clerk/commit/478179c))
- Add initial docs ([f721652](https://github.com/wobsoriano/vue-clerk/commit/f721652))
- Update plugin config instructions ([8c47d0c](https://github.com/wobsoriano/vue-clerk/commit/8c47d0c))
- Add composables and components ([58dac76](https://github.com/wobsoriano/vue-clerk/commit/58dac76))
- Fix clerk build ([634a056](https://github.com/wobsoriano/vue-clerk/commit/634a056))
- Add initial SignUp component docs ([ad028a5](https://github.com/wobsoriano/vue-clerk/commit/ad028a5))
- Fix redirect urls ([5f99d52](https://github.com/wobsoriano/vue-clerk/commit/5f99d52))
- Add props section to currenct components ([c281238](https://github.com/wobsoriano/vue-clerk/commit/c281238))
- Add props section to composables ([40a17e9](https://github.com/wobsoriano/vue-clerk/commit/40a17e9))
- Make ui components responsive ([8e5b9e4](https://github.com/wobsoriano/vue-clerk/commit/8e5b9e4))
- Add initial UserProfile doc ([a467d25](https://github.com/wobsoriano/vue-clerk/commit/a467d25))
- Add sign in and out button docs ([cb49df9](https://github.com/wobsoriano/vue-clerk/commit/cb49df9))
- Update ui components ([b55a513](https://github.com/wobsoriano/vue-clerk/commit/b55a513))
- Update getting started ([3714c6c](https://github.com/wobsoriano/vue-clerk/commit/3714c6c))
- Revert ([c3c2659](https://github.com/wobsoriano/vue-clerk/commit/c3c2659))
- Update homepage ([5464108](https://github.com/wobsoriano/vue-clerk/commit/5464108))
- Update getting started ([2f75eee](https://github.com/wobsoriano/vue-clerk/commit/2f75eee))
- Add useClerk doc ([3e86b73](https://github.com/wobsoriano/vue-clerk/commit/3e86b73))
- Add useSession doc ([1d9c5c2](https://github.com/wobsoriano/vue-clerk/commit/1d9c5c2))
- Add useSignIn doc ([0527bc5](https://github.com/wobsoriano/vue-clerk/commit/0527bc5))
- Add missing import ([a0d9045](https://github.com/wobsoriano/vue-clerk/commit/a0d9045))
- Add useSignUp doc ([e165f19](https://github.com/wobsoriano/vue-clerk/commit/e165f19))
- Update composable links ([f833714](https://github.com/wobsoriano/vue-clerk/commit/f833714))

### 🏡 Chore

- Set default SignInButton mode to redirect ([ca6ce67](https://github.com/wobsoriano/vue-clerk/commit/ca6ce67))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.0.5

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.4...v0.0.5)

### 🚀 Enhancements

- Add UserButton component ([ffb6dc0](https://github.com/wobsoriano/vue-clerk/commit/ffb6dc0))
- Add useSessionList composable ([b4e110d](https://github.com/wobsoriano/vue-clerk/commit/b4e110d))

### 🩹 Fixes

- Make sure clerk is loaded before mounting components ([21937a4](https://github.com/wobsoriano/vue-clerk/commit/21937a4))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))

## v0.0.4

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.3...v0.0.4)

## v0.0.3

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.2...v0.0.3)

## v0.0.2

[compare changes](https://github.com/wobsoriano/vue-clerk/compare/v0.0.1...v0.0.2)

## v0.0.1

### 🤖 CI

- Add changelogen ([11fc78d](https://github.com/wobsoriano/vue-clerk/commit/11fc78d))

### ❤️ Contributors

- Wobsoriano ([@wobsoriano](http://github.com/wobsoriano))
