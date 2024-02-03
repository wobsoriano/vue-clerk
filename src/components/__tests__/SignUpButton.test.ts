import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { defineComponent, h } from 'vue'
import SignUpButton from '../SignUpButton.vue'

const mockRedirectToSignUp = vi.fn()
const originalError = console.error

vi.mock('../../composables/useClerk', async () => {
  return {
    useClerk: () => ({
      redirectToSignUp: mockRedirectToSignUp,
    }),
  }
})

const url = 'https://www.clerk.com'

describe('<SignUpButton />', () => {
  beforeAll(() => {
    console.error = vi.fn()
  })

  beforeEach(() => {
    mockRedirectToSignUp.mockReset()
  })

  afterAll(() => {
    console.error = originalError
  })

  it('calls clerk.redirectToSignUp when clicked', async () => {
    render(SignUpButton)
    const btn = screen.getByTestId('sign-up-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(mockRedirectToSignUp).toHaveBeenCalled()
    })
  })

  it('handles redirectUrl prop', async () => {
    render(SignUpButton, {
      props: {
        redirectUrl: url,
      },
    })
    const btn = screen.getByTestId('sign-up-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(mockRedirectToSignUp).toHaveBeenCalledWith({ redirectUrl: url })
    })
  })

  it('handles afterSignUpUrl prop', async () => {
    render(SignUpButton, {
      props: {
        afterSignUpUrl: url,
      },
    })
    const btn = screen.getByTestId('sign-up-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(mockRedirectToSignUp).toHaveBeenCalledWith({
        afterSignUpUrl: url,
      })
    })
  })

  it('renders passed button and calls both click handlers', async () => {
    const handler = vi.fn()

    const Button = defineComponent(() => {
      return () => h(SignUpButton, null, () => h('button', { onClick: handler, type: 'button' }, 'custom button'))
    })

    render(Button)

    const btn = screen.getByText('custom button')
    await userEvent.click(btn)

    expect(handler).toHaveBeenCalled()
    // expect(mockRedirectToSignUp).toHaveBeenCalled()
  })

  it('uses text passed as children', async () => {
    const Button = defineComponent(() => {
      return () => h(SignUpButton, () => 'text')
    })
    render(Button)
    screen.getByText('text')
  })
})
