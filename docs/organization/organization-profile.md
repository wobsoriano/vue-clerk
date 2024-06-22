---
outline: deep
---

# `<OrganizationProfile />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Forganization-profile.svg&w=1920&q=75" />

The `<OrganizationProfile />` component is used to render a beautiful, full-featured organization management UI that allows users to manage their organization profile and security settings.

Out of the box, this component's General tab displays the organization's information and the Leave organization button. Admins will be able to see the Update profile button, Verified domains section, and Delete organization button.

The Members tab shows the organization's members along with their join dates and roles. Admins will have the ability to invite a member, change a member's role, or remove them from the organization. Admins will have tabs within the Members tab to view the organization's [invitations](https://clerk.com/docs/organizations/overview#organization-invitations) and [requests](https://clerk.com/docs/organizations/overview#membership-requests).

## Props

Click [here](https://clerk.com/docs/components/organization/organization-profile#properties) to see the full list of props available.

## Usage

```vue
<script setup>
import { OrganizationProfile } from 'vue-clerk'
</script>

<template>
  <OrganizationProfile path="/organization-profile" />
</template>
```
