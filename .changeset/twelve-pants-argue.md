---
"vue-clerk": minor
---

Add experimental custom server middleware

Example usage:

```ts
// server/middleware/clerk.ts
import { clerkMiddleware } from 'vue-clerk/server'

export default clerkMiddleware((event) => {
  const { auth } = event.context

  if (!auth.userId && event.path.startsWith('/api')) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
})
```
