---
outline: deep
---

# Add custom items and links to the `<UserButton />` component

The `<UserButton />` component supports custom menu items, allowing the incorporation of app-specific settings or additional functionality.

To add a custom menu item to the `<UserButton />` component, use the `<UserButton.MenuItems />` component.

## `<UserButton.Action>`

Custom actions can be rendered inside the `<UserButton />` component using the `<UserButton.Action />` component. This component is useful for adding actions like opening a chat or triggering a modal.

The `<UserButton />` component must be wrapped in a `<UserButton.MenuItems />` component to render the custom action.

```vue
<script setup>
import { UserButton } from 'vue-clerk'

function openChat() {
  alert('init chat')
}
</script>

<template>
  <UserButton>
    <UserButton.MenuItems>
        <UserButton.Action label="Open chat" @click="openChat">
            <template #labelIcon><Icon /></template>
        </UserButton.Action>
    </UserButton.MenuItems>
  </UserButton>
</template>
```

The following example demonstrates how to add an action, as well as a [custom page](/guides/custom-pages/user-profile), to the `<UserButton />` component.

```vue
<script setup>
import { UserButton } from 'vue-clerk'

function openChat() {
  alert('init chat')
}
</script>

<template>
  <UserButton>
    <UserButton.MenuItems>
        <UserButton.Action label="Help" open="help">
            <template #labelIcon><Icon /></template>
        </UserButton.Action>
    </UserButton.MenuItems>
    <UserButton.UserProfilePage label="Help" url="help">
        <template #labelIcon><Icon /></template>
        <div>
            <h1>Help Page</h1>
            <p>This is the custom help page</p>
        </div>
    </UserButton.UserProfilePage>
  </UserButton>
</template>
```

## `<UserButton.Link>`

Custom links can be rendered inside the `<UserButton />` component using the `<UserButton.Link />` component. This component is useful for adding links to custom pages or external URLs.

The `<UserButton />` component must be wrapped in a `<UserButton.MenuItems />` component to render the custom link.

```vue
<script setup>
import { UserButton } from 'vue-clerk'

function openChat() {
  alert('init chat')
}
</script>

<template>
    <UserButton>
        <UserButton.MenuItems>
            <UserButton.Link label="Create organization" href="/create-organization">
                <template #labelIcon><Icon /></template>
            </UserButton.Link>
        </UserButton.MenuItems>
    </UserButton>
</template>
```

## Reorder default items

The `<UserButton />` component includes two default menu items: `Manage account` and `Sign out`. You can reorder these default items by setting the `label` prop to `'manageAccount'` or `'signOut'`. This will target the existing default item and allow you to rearrange it, as shown in the following example:

```vue
<script setup>
import { UserButton } from 'vue-clerk'
</script>

<template>
    <UserButton>
        <UserButton.MenuItems>
            <UserButton.Action label="signOut" />
            <UserButton.Link label="Create organization" href="/create-organization">
                <template #labelIcon><Icon /></template>
            </UserButton.Link>
            <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
    </UserButton>
</template>
```

With the above example, the `<UserButton />` menu items will be in the following order:

1. Sign out
2. Create organization
3. Manage account

## Conditionally render menu items

To conditionally render menu items based on a user's role or permissions, you can use the `has()` helper function:

```vue
<script setup>
import { UserButton, useAuth } from 'vue-clerk'

const { has } = useAuth()
</script>

<template>
    <UserButton>
        <UserButton.MenuItems v-if="has({ permission: 'org:app:admin' })">
            <UserButton.Link label="Create organization" href="/create-organization">
                <template #labelIcon><Icon /></template>
            </UserButton.Link>
        </UserButton.MenuItems>
    </UserButton>
</template>
```

With the above example, the "Create organization" menu item will only render if the current user has the `org:app:admin` permission.
