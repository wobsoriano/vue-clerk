import { expectTypeOf } from 'expect-type'
import type { ComponentProps } from 'vue-component-type-helpers'

import type { UserButton } from '../uiComponents'

export type UserButtonComponentProps = ComponentProps<typeof UserButton>

describe('<UserButton/>', () => {
  describe('type tests', () => {
    it('userProfileUrl is a string', () => {
      expectTypeOf({ userProfileUrl: '/' }).toMatchTypeOf<UserButtonComponentProps>()
      expectTypeOf<{
        userProfileUrl: string
      }>().toMatchTypeOf<UserButtonComponentProps>()
    })

    it('userProfileUrl url is a string and userProfileMode is navigation', () => {
      expectTypeOf({
        userProfileUrl: '/',
        userProfileMode: 'navigation' as const,
      }).toMatchTypeOf<UserButtonComponentProps>()
      expectTypeOf<{
        userProfileUrl: string
      }>().toMatchTypeOf<UserButtonComponentProps>()
    })

    it('that when userProfileMode is navigation that userProfileUrl is filled', () => {
      expectTypeOf({
        userProfileMode: 'navigation' as const,
      }).not.toMatchTypeOf<UserButtonComponentProps>()
    })

    it('that when userProfileMode is modal that userProfileUrl is not filled', () => {
      expectTypeOf({
        userProfileMode: 'modal' as const,
        userProfileUrl: '/',
      }).not.toMatchTypeOf<UserButtonComponentProps>()
    })

    it('userProfileMode is modal', () => {
      expectTypeOf({
        userProfileMode: 'modal' as const,
      }).toMatchTypeOf<UserButtonComponentProps>()
    })
  })
})
