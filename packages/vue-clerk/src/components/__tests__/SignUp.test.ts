import { expectTypeOf } from 'expect-type'
import type { ComponentProps } from 'vue-component-type-helpers'

import type { SignUp } from '../uiComponents'

export type SignUpComponentProps = ComponentProps<typeof SignUp>

describe('<SignUp/>', () => {
  describe('type tests', () => {
    it('has path filled', () => {
      expectTypeOf({ path: '/sign-up' }).toMatchTypeOf<SignUpComponentProps>()
    })

    it('has path filled and routing has path as a value', () => {
      expectTypeOf({
        path: '/sign-up',
        routing: 'path' as const,
      }).toMatchTypeOf<SignUpComponentProps>()
    })

    it('when path is filled, routing must only have path as value', () => {
      expectTypeOf({
        path: '/sign-up',
        routing: 'virtual' as const,
      }).not.toMatchTypeOf<SignUpComponentProps>()

      expectTypeOf({
        path: '/sign-up',
        routing: 'hash' as const,
      }).not.toMatchTypeOf<SignUpComponentProps>()
    })

    it('when routing is hash or virtual path must be present', () => {
      expectTypeOf({
        routing: 'hash' as const,
      }).toMatchTypeOf<SignUpComponentProps>()
    })
  })
})
