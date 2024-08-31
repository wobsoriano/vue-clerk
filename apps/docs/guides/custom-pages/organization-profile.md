---
outline: deep
---

# Add custom pages and links to the `<OrganizationProfile />` component

The [`<OrganizationProfile />`](/components/organization/organization-profile) component supports the addition of custom pages and use of external links in the navigation sidebar.

## Add a custom page

Custom pages can be rendered inside the `<OrganizationProfile />` component and provide a way to incorporate app-specific settings or additional functionality.

To add a custom page to the `<OrganizationProfile />` component, use the `<OrganizationSwitcher.OrganizationProfilePage />` component or the `<OrganizationProfile.Page />` component, depending on your use case.
::: code-group

```vue [OrganizationSwitcher]
<script setup>
import { OrganizationSwitcher } from 'vue-clerk'
</script>

<template>
  <div>
    <!-- Work In Progress -->
  </div>
</template>
```

```vue [Dedicated page]
<script setup>
import { OrganizationProfile } from 'vue-clerk'
</script>

<template>
  <OrganizationProfile>
    <OrganizationProfile.Page label="Custom Page" url="custom-page">
      <template #labelIcon>
        <Icon />
      </template>
      <CustomPage />
    </OrganizationProfile.Page>
  </OrganizationProfile>
</template>
```

:::

## Add a custom link

You can add external links to the `<OrganizationProfile />` navigation sidebar using the `<OrganizationSwitcher.OrganizationProfileLink />` component or the `<OrganizationProfile.Link />` component, depending on your use case.

::: code-group

```vue [OrganizationSwitcher]
<script setup>
import { OrganizationSwitcher } from 'vue-clerk'
</script>

<template>
  <div>
    <!-- Work In Progress -->
  </div>
</template>
```

```vue [Dedicated page]
<script setup>
import { OrganizationProfile } from 'vue-clerk'
</script>

<template>
  <OrganizationProfile>
    <OrganizationProfile.Link label="Homepage" url="/">
      <template #labelIcon>
        <Icon />
      </template>
    </OrganizationProfile.Link>
  </OrganizationProfile>
</template>
```

:::

## Reorder default routes

If you want to reorder the default routes, `Members` and `Settings`, set the `label` prop to `'members'` or `'settings'`. This will target the existing default page and allow you to rearrange it.

Note that when reordering default routes, the first item in the navigation sidebar cannot be a `<OrganizationSwitcher.OrganizationProfileLink />` or `<OrganizationProfile.Link />` component.

::: code-group

```vue [OrganizationSwitcher]
<script setup>
import { OrganizationSwitcher } from 'vue-clerk'
</script>

<template>
  <div>
    <!-- Work In Progress -->
  </div>
</template>
```

```vue [Dedicated page]
<script setup>
import { OrganizationProfile } from 'vue-clerk'
</script>

<template>
  <OrganizationProfile>
    <OrganizationProfile.Page label="Custom Page">
      <template #labelIcon>
        <Icon />
      </template>
      <CustomPage />
    </OrganizationProfile.Page>
    <OrganizationProfile.Link label="Homepage" url="/">
      <template #labelIcon>
        <Icon />
      </template>
    </OrganizationProfile.Link>
    <OrganizationProfile.Page label="members" />
    <OrganizationProfile.Page label="general" />
  </OrganizationProfile>
</template>
```

:::

With the above example, the `<UserProfile />` navigation sidebar will be in the following order:

1. Custom Page
2. Homepage
3. Members
4. Settings
