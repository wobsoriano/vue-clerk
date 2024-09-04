---
"vue-clerk": patch
---

Support roles and permissions in Nuxt middleware

Examples:

Allow users that have the `org:invoices:create` permission

```ts
definePageMeta({
  middleware: 'auth',
  auth: {
    permission: 'org:invoices:create'
  }
})
```

Allow users with the `org:billing` role

```ts
definePageMeta({
  middleware: 'auth',
  auth: {
    role: 'org:billing'
  }
})
```

