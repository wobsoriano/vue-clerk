import type { ActiveSessionResource, OrganizationResource } from '@clerk/types'
import { toRefs } from '@vueuse/core'
import { computed } from 'vue'
import { useClerkProvide } from './useClerkProvide'
import { useClerk } from './useClerk'

type UseOrganizationReturn =
  | {
    isLoaded: false
    organization: undefined
  }
  | {
    isLoaded: true
    organization: OrganizationResource
  }
  | {
    isLoaded: boolean
    organization: OrganizationResource | null
  }

export function useOrganization() {
  const { derivedState } = useClerkProvide()
  const clerk = useClerk()

  const result = computed<UseOrganizationReturn>(() => {
    const { organization } = derivedState.value

    if (organization === undefined)
      return { isLoaded: false, organization: undefined }

    if (organization === null)
      return { isLoaded: true, organization: null }

    return { isLoaded: clerk.loaded, organization }
  })

  return toRefs(result)
}
