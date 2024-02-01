---
outline: deep
---

# CreateOrganization

## Overview

The `<CreateOrganization />` component is used to render an organization creation UI that allows users to create brand new organizations within your application.

<img src="https://clerk.com/_next/image?url=%2Fdocs%2Fimages%2Fui-components%2Fcomponent-org_create.svg&w=2048&q=75" />

## Usage

```vue
<script setup lang="ts">
import { CreateOrganization } from 'vue-clerk'
</script>

<template>
  <CreateOrganization routing="path" path="/create-organization" />
</template>
```

## Props

|Name|Type|Description|
|:----|:----|:----|
|`afterCreateOrganizationUrl`|`string`|Full URL or path to navigate after creating a new organization.|
|`routing`|`'hash' \|'path' \|'virtual'`|The routing strategy for your pages.|
|`path`|`string`|The path where the component is mounted when path-based routing is used. -e.g. /create-org. This prop is ignored in hash and virtual based routing.|
|`appearance`|`[Appearance](https://clerk.com/docs/components/customization/overview) \|undefined`|Optional object to style your components. Will only affect Clerk Components and not [Account Portal](https://clerk.com/docs/account-portal/overview) pages.|
