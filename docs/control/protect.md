---
outline: deep
---

# `<Protect />`

The `<Protect>` component is used for authorization. It only renders its children when the current user has the specified permission or role in the organization.

## Props

Click [here](https://clerk.com/docs/components/protect#properties) to see the full list of props available.

## Slots

|Name|Description|
|:---:|:---:|
|`fallback?`|An optional element to show when a user doesn't have the `role` or `permission` to access the protected content.|

## Usage

To limit who is able to see the content that `<Protect>` renders, you can pass either the `permission` or `role` prop. The recommended approach is to use `permission` because this lets you modify roles without breaking your application. Permissions can be assigned to different roles with ease.

If you do not pass either prop, `<Protect>` behaves the same as `<SignedIn>` and will render its children if the user is signed in, regardless of their role or its permissions.

For more complex authorization logic, [pass conditional logic to the `condition` prop](https://clerk.com/docs/components/protect#render-content-conditionally).

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
    <p>Visible content.</p>
  </Protect>
</template>
```

### Render content by role

While authorization by `permission` is recommended, for convenience, `<Protect>` allows a `role` prop to be passed. The children of the following component will only be visible to users with the `org:billing` role.

```vue
<script setup>
import { Protect } from 'vue-clerk'
</script>

<template>
  <Protect role="org:billing">
    <template #fallback>
      <p>Only a member of the Billing department can access this content.</p>
    </template>
    <p>Visible content.</p>
  </Protect>
</template>
```

### Render content conditionally
The following example uses `<Protect>`'s condition prop to conditionally render its children if the user has the correct role.

```vue
<script setup>
import { Protect } from 'vue-clerk'
</script>

<template>
  <Protect :condition="(has) => has({ role: 'org:admin' }) || has({ role: 'org:billing_manager' })">
    <template #fallback>
      <p>Only an Admin or Billing Manager can access this content.</p>
    </template>
    <p>Visible content.</p>
  </Protect>
</template>
```
