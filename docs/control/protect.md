---
outline: deep
---

# Protect

The `<Protect>` component is used for authorization. It only renders its children when the current user has the specified permission or role in the organization.

## Usage

To limit who is able to see the content that `<Protect>` renders, you can pass either the `permission` or `role` prop. The recommended approach is to use `permission` because this lets you modify roles without breaking your application. Permissions can be assigned to different roles with ease.

If you do not pass either prop, `<Protect>` behaves the same as `<SignedIn>` and will render its children if the user is signed in, regardless of their role or its permissions.

For more complex authorization logic, pass conditional logic to the `condition` prop.

### Render content by permissions

The children of the following component will only be visible to users with roles that have the `org:invoices:create` permission.

```vue
<script setup>
import { Protect } from 'vue-clerk'
</script>

<template>
  <Protect permission="org:invoices:create">
    <template #fallback>
      <p>You do not have the permissions to create an invoice.</p>
    </template>
    <p>Visible content to users with the said permission.</p>
  </Protect>
</template>
```

### Render content by role

While authorization by permission is recommended, for convenience, `<Protect>` allows a role prop to be passed. The children of the following component will only be visible to users with the `org:billing` role.

```vue
<script setup>
import { Protect } from 'vue-clerk'
</script>

<template>
  <Protect permission="org:billing">
    <template #fallback>
      <p>Only a member of the Billing department can access this content.</p>
    </template>
    <p>Visible content to the Billing department.</p>
  </Protect>
</template>
```

## Props

|Name|Type|Description|
|:---:|:---:|:---:|
|`condition?`|`has => boolean`|Optional conditional logic that renders the children if it returns `true`.|
|`permission?`|`string`|Optional string corresponding to a Role's Permission in the format `org:<resource>:<action>`|
|`role?`|`string`|Optional string corresponding to an Organization's Role in the format `org:<role>`|

:::warning
`<Protect>` can only accept `permission` or `role`, not both. The recommended approach is to use `permission`.
:::

## Slots

|Name|Description|
|:---:|:---:|
|`fallback?`|An optional element to show when a user doesn't have the `role` or `permission` to access the protected content.|
