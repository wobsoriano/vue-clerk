import { expectTypeOf } from 'expect-type'
import type { ComponentProps } from 'vue-component-type-helpers'

import type { SignIn } from '../uiComponents'

export type SignInComponentProps = ComponentProps<typeof SignIn>

describe('<SignIn/>', () => {
  describe('type tests', () => {
    it('has path filled', () => {
      expectTypeOf({ path: '/sign-in' }).toMatchTypeOf<SignInComponentProps>()
    })

    it('has path filled and routing has path as a value', () => {
      expectTypeOf({
        path: '/sign-in',
        routing: 'path' as const,
      }).toMatchTypeOf<SignInComponentProps>()
    })

    it('when path is filled, routing must only have path as value', () => {
      expectTypeOf({
        path: '/sign-in',
        routing: 'virtual' as const,
      }).not.toMatchTypeOf<SignInComponentProps>()

      expectTypeOf({
        path: '/sign-in',
        routing: 'hash' as const,
      }).not.toMatchTypeOf<SignInComponentProps>()
    })

    it('when routing is hash or virtual path must be present', () => {
      expectTypeOf({
        routing: 'hash' as const,
      }).toMatchTypeOf<SignInComponentProps>()
    })
  })
})
