import { expectTypeOf } from 'expect-type'
import type { ComponentProps } from 'vue-component-type-helpers'

import type { UserProfile } from '../uiComponents'

export type UserProfileComponentProps = ComponentProps<typeof UserProfile>

describe('<UserProfile/>', () => {
  describe('type tests', () => {
    it('has path filled', () => {
      expectTypeOf({ path: '/profile' }).toMatchTypeOf<UserProfileComponentProps>()
    })

    it('has path filled and routing has path as a value', () => {
      expectTypeOf({
        path: '/profile',
        routing: 'path' as const,
      }).toMatchTypeOf<UserProfileComponentProps>()
    })

    it('when path is filled, routing must only have path as value', () => {
      expectTypeOf({
        path: '/profile',
        routing: 'virtual' as const,
      }).not.toMatchTypeOf<UserProfileComponentProps>()

      expectTypeOf({
        path: '/profile',
        routing: 'hash' as const,
      }).not.toMatchTypeOf<UserProfileComponentProps>()
    })

    it('when routing is hash or virtual path must be present', () => {
      expectTypeOf({
        routing: 'hash' as const,
      }).toMatchTypeOf<UserProfileComponentProps>()
    })
  })
})
