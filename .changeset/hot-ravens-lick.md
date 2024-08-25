---
"vue-clerk": patch
---

Add helper function to update Clerk options

Usage:

```ts
import { updateClerkOptions } from 'vue-clerk'
import { frFR } from '@clerk/localizations'

updateClerkOptions({
  localization: frFR,
  appearance: {
    elements: {
      formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm'
    }
  }
})
```
