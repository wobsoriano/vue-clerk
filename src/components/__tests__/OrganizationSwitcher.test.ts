import { expectTypeOf } from 'expect-type'
import type { ComponentProps } from 'vue-component-type-helpers'

import type { OrganizationSwitcher } from '../uiComponents'

export type OrganizationSwitcherComponentProps = ComponentProps<typeof OrganizationSwitcher>

describe('<OrganizationSwitcher/>', () => {
  describe('type tests', () => {
    it('createOrganizationUrl is a string', () => {
      expectTypeOf({
        createOrganizationUrl: '/',
      }).toMatchTypeOf<OrganizationSwitcherComponentProps>()
    })

    it('createOrganizationUrl is a string and createOrganizationMode is navigation', () => {
      expectTypeOf({
        createOrganizationUrl: '/',
        createOrganizationMode: 'navigation' as const,
      }).toMatchTypeOf<OrganizationSwitcherComponentProps>()
    })

    it('createOrganizationUrl is a string and createOrganizationMode is not modal', () => {
      expectTypeOf({
        createOrganizationUrl: '/',
        createOrganizationMode: 'modal' as const,
      }).not.toMatchTypeOf<OrganizationSwitcherComponentProps>()
    })

    it('createOrganizationMode is modal and path must not been present', () => {
      expectTypeOf({
        createOrganizationMode: 'modal' as const,
      }).toMatchTypeOf<OrganizationSwitcherComponentProps>()
    })

    it('createOrganizationMode is navigation and path is not present', () => {
      expectTypeOf({
        createOrganizationMode: 'navigation' as const,
      }).not.toMatchTypeOf<OrganizationSwitcherComponentProps>()
    })
  })
})
