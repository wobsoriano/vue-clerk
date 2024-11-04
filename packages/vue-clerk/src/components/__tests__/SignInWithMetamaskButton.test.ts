import { vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { userEvent } from '@testing-library/user-event'
import { defineComponent, h } from 'vue'
import SignInWithMetamaskButton from '../SignInWithMetamaskButton.vue'

const mockAuthenticatewithMetamask = vi.fn()
const originalError = console.error

vi.mock('../../composables/useClerk', async () => {
  return {
    useClerk: () => ({
      authenticateWithMetamask: mockAuthenticatewithMetamask,
    }),
  }
})

describe('<SignInWithMetamaskButton />', () => {
  beforeAll(() => {
    console.error = vi.fn()
  })

  beforeEach(() => {
    mockAuthenticatewithMetamask.mockReset()
  })

  afterAll(() => {
    console.error = originalError
  })

  it('calls clerk.authenticateWithMetamask when clicked', async () => {
    render(SignInWithMetamaskButton)
    const btn = screen.getByText('Sign in with Metamask')
    await userEvent.click(btn)

    expect(mockAuthenticatewithMetamask).toHaveBeenCalled()
  })

  it('uses text passed as children', async () => {
    const Button = defineComponent(() => {
      return () => h(SignInWithMetamaskButton, () => 'text')
    })
    render(Button)
    screen.getByText('text')
  })
})
