---
outline: deep
---

# `<OrganizationList />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Forganization-list.svg&w=1080&q=75" />

The `<OrganizationList />` component is used to display organization related memberships, invitations, and suggestions for the user.

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

## Props

|Name|Type|Description|
|:----|:----|:----|
|`hidePersonal`|`boolean`|By default, users can switch between organization and their personal account. This option controls whether `<OrganizationList />` will include the user's personal account in the organization list. Setting this to `false` will hide the personal account entry, and users will only be able to switch between organizations. Defaults to `false`.|
|`skipInvitationScreen`|`boolean` \|`undefined`|Hides the screen for sending invitations after an organization is created. When left undefined Clerk will automatically hide the screen if the number of max allowed members is equal to 1.Defaults to `false`.|
|`appearance`|[`Appearance`](https://clerk.com/docs/components/customization/overview) \| `undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`afterCreateOrganizationUrl`|`((org: Organization) => string)` \|`string`|Full URL or path to navigate after creating a new organization.|
|`afterSelectOrganizationUrl`|`((org: Organization) => string)` \|`string`|Full URL or path to navigate after selecting an organization.Defaults to `undefined`.|
|`afterSelectPersonalUrl`|`((org: Organization) => string)` \|`string`|Full URL or path to navigate after selecting the personal account.Defaults to `undefined`.|
