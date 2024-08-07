---
outline: deep
---

# useOrganization()

The `useOrganization()` composable is used to retrieve attributes of the currently active organization.

## Usage

The following example demonstrates how to use the `useOrganization()` composable to access the [`Organization`](https://clerk.com/docs/references/javascript/organization/organization) object, which allows you to access the current active organization.

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { useOrganization } from '@clerk/vue'

const { organization, isLoaded } = useOrganization()
</script>

<template>
  <div v-if="isLoaded">
    <p>This current organization is {{ organization.name }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
```

## Paginating data

The following example demonstrates how to implement pagination for organization memberships. The `memberships` ref will be populated with the first page of the organization's memberships. When the "Previous page" or "Next page" button is clicked, the `fetchMemberships` function will be called to fetch the previous or next page of memberships.

You can implement this pattern to any Clerk function that returns a [`ClerkPaginatedResponse`](https://clerk.com/docs/references/javascript/types/clerk-paginated-response#clerk-paginated-response) object.

```vue
<script setup>
import { ref, watchEffect } from 'vue'
import { useOrganization } from '@clerk/vue'

const memberships = ref([])
const currentPage = ref(1)
const { organization, isLoading } = useOrganization()

const pageSize = 10

async function fetchMemberships() {
  if (!organization.value) {
    return
  }

  const { data } = await organization.value.getMemberships({
    initialPage: currentPage.value,
    pageSize: 5
  })
  memberships.value = data
}

watchEffect(() => {
  if (!organization.value) {
    return
  }

  fetchMemberships()
})

const fetchPrevious = () => currentPage.value--
const fetchNext = () => currentPage.value++
</script>

<template>
  <div v-if="isLoading">
    <h2>Organization members</h2>
    <ul>
      <li v-for="membership in memberships" :key="membership.id">
        {{ membership.publicUserData.firstName }} {{ membership.publicUserData.lastName }}
        &lt;{{ membership.publicUserData.identifier }}&gt; :: {{ membership.role }}
      </li>
    </ul>
    <div>
      <button :disabled="currentPage === 1" @click="fetchPrevious">
        Previous
      </button>
      <button @click="fetchNext">
        Next
      </button>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
```
