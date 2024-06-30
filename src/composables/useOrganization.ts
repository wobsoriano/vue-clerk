import type { OrganizationMembershipResource, OrganizationResource } from '@clerk/types'
import { computed } from 'vue'
import type { ToComputedRefs } from '../utils'
import { toComputedRefs } from '../utils'
import { useClerkProvider } from './useClerkProvider'
import { useSession } from './useSession'

type UseOrganizationReturn =
  | {
    isLoaded: false
    organization: undefined
    membership: undefined
  }
  | {
    isLoaded: true
    organization: OrganizationResource
    membership: undefined
  }
  | {
    isLoaded: boolean
    organization: OrganizationResource | null
    membership: OrganizationMembershipResource | null | undefined
  }

export function useOrganization(): ToComputedRefs<UseOrganizationReturn> {
  const { isClerkLoaded, organizationCtx } = useClerkProvider()
  const { session } = useSession()

  const result = computed<UseOrganizationReturn>(() => {
    if (organizationCtx.value === undefined)
      return { isLoaded: false, organization: undefined, membership: undefined }

    if (organizationCtx.value === null)
      return { isLoaded: true, organization: null, membership: null }

    /** In SSR context we include only the organization object when loadOrg is set to true. */
    if (!isClerkLoaded.value) {
      return {
        isLoaded: true,
        organization: organizationCtx.value,
        membership: undefined,
      }
    }

    return {
      isLoaded: isClerkLoaded.value,
      organization: organizationCtx.value,
      membership: getCurrentOrganizationMembership(
        session.value!.user.organizationMemberships,
        organizationCtx.value.id,
      ),
    }
  })

  return toComputedRefs(result)
}

function getCurrentOrganizationMembership(
  organizationMemberships: OrganizationMembershipResource[],
  activeOrganizationId: string,
) {
  return organizationMemberships.find(
    organizationMembership => organizationMembership.organization.id === activeOrganizationId,
  )
}
