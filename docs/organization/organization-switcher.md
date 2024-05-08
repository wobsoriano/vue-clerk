---
outline: deep
---

# `<OrganizationSwitcher />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Forganization-switcher.svg&w=1080&q=75" />

The `<OrganizationSwitcher />` component is used to enable the ability to switch between available organizations the user may be part of in your application.

## Usage

```vue
<script setup>
import { OrganizationSwitcher } from 'vue-clerk'
</script>

<template>
  <OrganizationSwitcher />
</template>
```

## Props

|Name|Type|Description|
|:----|:----|:----|
|`afterCreateOrganizationUrl`|`string`|Full URL or path to navigate after creating a new organization.|
|`appearance`|[`Appearance`](https://clerk.com/docs/components/customization/overview) \| `undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
|`createOrganizationUrl`|`string`|Full URL or path where the [`<CreateOrganization />`](/organization/create-organization) component is mounted.|
|`organizationProfileUrl`|`string`|Full URL or path where the [`<OrganizationProfile />`](/organization/organization-profile) component is mounted.|
|`createOrganizationMode`|`'modal' \|'navigation'`|Controls whether clicking the "Create organization" button will cause the [`<CreateOrganization />`](/organization/create-organization) component to open as a modal, or if the browser will navigate to the `createOrganizationUrl` where [`<CreateOrganization />`](/organization/create-organization) is mounted as a page.Defaults to: `'modal'`.|
|`organizationProfileMode`|`'modal' \|'navigation'`|Controls whether clicking the "Manage organization" button will cause the [`<OrganizationProfile />`](/organization/organization-profile) component to open as a modal, or if the browser will navigate to the `organizationProfileUrl` where [`<OrganizationProfile />`](/organization/organization-profile) is mounted as a page.Defaults to: `'modal'`.|
|`afterLeaveOrganizationUrl`|`string`|Full URL or path to navigate to after the user leaves the currently active organization.|
|`afterSwitchOrganizationUrl`|`string`|Full URL or path to navigate after a successful organization switch.|
|`hidePersonal`|`boolean`|By default, users can switch between organizations and their personal workspace. This option controls whether [`<OrganizationSwitcher />`](/organization/organization-switcher) will include the user's personal workspace in the organization list. Setting this to `true` will hide the personal workspace entry, and allow users to switch only between organizations.Defaults to: `false`.|
|`defaultOpen`|`boolean`|Controls the default state of the [`<OrganizationSwitcher />`](/organization/organization-switcher) component.|
|`organizationProfileProps`|`object`|Specify options for the underlying [`<OrganizationProfile />`](/organization/organization-profile) component.e.g. `{appearance: {...}}`|
