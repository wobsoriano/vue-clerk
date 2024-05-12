import type { OrganizationResource } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvide } from './useClerkProvide'

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

export function useOrganization(): ToComputedRefs<UseOrganizationReturn> {
  const { isClerkLoaded, derivedState } = useClerkProvide()

  const result = computed<UseOrganizationReturn>(() => {
    const { organization } = derivedState.value

    if (organization === undefined)
      return { isLoaded: false, organization: undefined }

    if (organization === null)
      return { isLoaded: true, organization: null }

    return { isLoaded: isClerkLoaded.value, organization }
  })

  return toComputedRefs(result)
}
