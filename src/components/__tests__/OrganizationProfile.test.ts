import { expectTypeOf } from 'expect-type'
import type { ComponentProps } from 'vue-component-type-helpers'

import type { OrganizationProfile } from '../uiComponents'

export type OrganizationProfileComponentProps = ComponentProps<typeof OrganizationProfile>

describe('<OrganizationProfile/>', () => {
  describe('type tests', () => {
    it('has path filled', () => {
      expectTypeOf({ path: '/org' }).toMatchTypeOf<OrganizationProfileComponentProps>()
    })

    it('has path filled and routing has path as a value', () => {
      expectTypeOf({
        path: '/org',
        routing: 'path' as const,
      }).toMatchTypeOf<OrganizationProfileComponentProps>()
    })

    it('when path is filled, routing must only have path as value', () => {
      expectTypeOf({
        path: '/org',
        routing: 'virtual' as const,
      }).not.toMatchTypeOf<OrganizationProfileComponentProps>()

      expectTypeOf({
        path: '/org',
        routing: 'hash' as const,
      }).not.toMatchTypeOf<OrganizationProfileComponentProps>()
    })

    it('when routing is hash or virtual path must be present', () => {
      expectTypeOf({
        routing: 'hash' as const,
      }).toMatchTypeOf<OrganizationProfileComponentProps>()
    })
  })
})
