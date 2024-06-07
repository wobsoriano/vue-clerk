---
outline: deep
---

# `<CreateOrganization />`

<br />
<img src="https://clerk.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F_docs%2Fmain%2Fui-components%2Fcreate-organization.svg&w=1080&q=75" />

The `<CreateOrganization />` component is used to render an organization creation UI that allows users to create brand new organizations within your application.

## Usage

```vue
<script setup>
import { CreateOrganization } from 'vue-clerk'
</script>

<template>
  <CreateOrganization />
</template>
```

## Props

|Name|Type|Description|
|:----|:----|:----|
|`afterCreateOrganizationUrl`|`string`|Full URL or path to navigate after creating a new organization.|
|`routing`|`'hash' \|'path' \|'virtual'`|The routing strategy for your pages.|
|`path`|`string`|The path where the component is mounted when path-based routing is used. -e.g. /create-org. This prop is ignored in hash and virtual based routing.|
|`appearance`|[`Appearance`](https://clerk.com/docs/components/customization/overview) / `undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
