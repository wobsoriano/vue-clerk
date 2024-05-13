import type { OrganizationResource } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvider } from './useClerkProvider'

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
  const { isClerkLoaded, organizationCtx } = useClerkProvider()

  const result = computed<UseOrganizationReturn>(() => {
    if (organizationCtx.value === undefined)
      return { isLoaded: false, organization: undefined }

    if (organizationCtx.value === null)
      return { isLoaded: true, organization: null }

    return { isLoaded: isClerkLoaded.value, organization: organizationCtx.value }
  })

  return toComputedRefs(result)
}
