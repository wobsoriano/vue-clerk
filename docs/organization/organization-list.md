---
outline: deep
---

# `<OrganizationList />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Forganization-list.svg&w=1080&q=75" />

The `<OrganizationList />` component is used to display organization related memberships, invitations, and suggestions for the user.

## Props

Click [here](https://clerk.com/docs/components/organization/organization-list#properties) to see the full list of props available.

## Usage

```vue
<script setup>
import { OrganizationList } from 'vue-clerk'
</script>

<template>
  <OrganizationList
    :after-create-organization-url="org => `/organization/${org.slug}`"
    :after-select-personal-url="org => `/organization/${org.slug}`"
    :after-select-organization-url="org => `/organization/${org.slug}`"
  />
</template>
```

### Force organizations

If you would like to prohibit people from using their personal accounts and force them to be part of an organization, the `hidePersonal` property forces your user to join or create an organization in order to continue.

```vue
<template>
  <OrganizationList hide-personal />
</template>
```
