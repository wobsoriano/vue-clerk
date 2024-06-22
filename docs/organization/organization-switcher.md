---
outline: deep
---

# `<OrganizationSwitcher />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Forganization-switcher.svg&w=1080&q=75" />

The `<OrganizationSwitcher />` component allows a user to switch between their account types - their personal account and their joined organizations. This component is useful for applications that have a multi-tenant architecture, where users can be part of multiple organizations.

Out of the box, this component will show notifications to the user if they have organization [invitations](https://clerk.com/docs/organizations/overview#organization-invitations) or [suggestions](https://clerk.com/docs/organizations/overview#suggestions). Admins will be able to see notifications for [requests](https://clerk.com/docs/organizations/overview#membership-requests) to join an organization.

## Props

Click [here](https://clerk.com/docs/components/organization/organization-switcher#properties) to see the full list of props available.

## Usage

```vue
<script setup>
import { OrganizationSwitcher } from 'vue-clerk'
</script>

<template>
  <OrganizationSwitcher />
</template>
```
