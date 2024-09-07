---
outline: deep
---

# Add custom pages and links to the `<UserProfile />` component

The [`<UserProfile />`](/components/user/user-profile) component supports the addition of custom pages and use of external links in the navigation sidebar.

## Add a custom page

Custom pages can be rendered inside the `<UserProfile />` component and provide a way to incorporate app-specific settings or additional functionality.

To add a custom page to the `<UserProfile />` component, use the `<UserButton.UserProfilePage />` component or the `<UserProfile.Page />` component, depending on your use case.

::: code-group

```vue [UserButton]
<script setup>
import { UserButton } from 'vue-clerk'
</script>

<template>
  <UserProfile>
    <UserButton.MenuItems>
      <UserButton.Action label="Help" open="help">
        <template #labelIcon>
          <Icon />
        </template>
      </UserButton.Action>
    </UserButton.MenuItems>
    <UserButton.UserProfilePage label="Help" url="help">
      <template #labelIcon>
        <Icon />
      </template>
      <div>
        <h1>Help Page</h1>
        <p>This is the custom help page</p>
      </div>
    </UserButton.UserProfilePage>
  </UserProfile>
</template>
```

```vue [Dedicated page]
<script setup>
import { UserProfile } from 'vue-clerk'
</script>

<template>
  <UserProfile>
    <UserProfile.Page label="Help" url="help">
      <template #labelIcon>
        <Icon />
      </template>
      <div>
        <h1>Help Page</h1>
        <p>This is the custom help page</p>
      </div>
    </UserProfile.Page>
  </UserProfile>
</template>
```

:::

## Add a custom link

You can add external links to the `<UserProfile />` navigation sidebar using the `<UserButton.UserProfileLink />` component or the `<UserProfile.Link />` component, depending on your use case.

::: code-group

```vue [UserButton]
<script setup>
import { UserButton } from 'vue-clerk'
</script>

<template>
  <header>
    <UserButton>
      <UserButton.UserProfileLink label="Homepage" url="/">
        <template #labelIcon>
          <Icon />
        </template>
      </UserButton.UserProfileLink>
    </UserButton>
  </header>
</template>
```

```vue [Dedicated page]
<script setup>
import { UserProfile } from 'vue-clerk'
</script>

<template>
  <UserProfile>
    <UserProfile.Link label="Homepage" url="/">
      <template #labelIcon>
        <Icon />
      </template>
    </UserProfile.Link>
  </UserProfile>
</template>
```

:::

## Reorder default routes

If you want to reorder the default routes, `Account` and `Security`, set the `label` prop to `'account'` or `'security'`. This will target the existing default page and allow you to rearrange it.

Note that when reordering default routes, the first item in the navigation sidebar cannot be a `<UserButton.UserProfileLink />` or `<UserProfile.Link />` component.

```vue
<script setup>
import { UserProfile } from 'vue-clerk'
</script>

<template>
  <UserProfile>
    <UserProfile.Page label="Custom Page">
      <template #labelIcon>
        <Icon />
      </template>
      <CustomPage />
    </UserProfile.Page>
    <UserProfile.Link label="Homepage" url="/">
      <template #labelIcon>
        <Icon />
      </template>
    </UserProfile.Link>
    <UserProfile.Page label="account" />
    <UserProfile.Page label="security" />
  </UserProfile>
</template>
```

With the above example, the `<UserProfile />` navigation sidebar will be in the following order:

1. Custom Page
2. Homepage
3. Account
4. Security
