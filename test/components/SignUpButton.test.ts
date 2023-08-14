import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { defineComponent, h } from 'vue'
import { SignUpButton } from '../../src/index'

const mockRedirectToSignUp = vi.fn()
const originalError = console.error

vi.mock('../../src/composables/useClerk', async () => {
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

  afterAll(() => {
    console.error = originalError
  })

  beforeEach(() => {
    mockRedirectToSignUp.mockReset()
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

  it('calls both click handlers', async () => {
    const handler = vi.fn()

    const Button = defineComponent(() => {
      return () => h(SignUpButton, {
        onClick: handler,
      }, () => 'custom button')
    })

    render(Button)

    const btn = screen.getByTestId('sign-up-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(handler).toHaveBeenCalled()
      expect(mockRedirectToSignUp).toHaveBeenCalled()
    })
  })

  it('uses text passed as children', async () => {
    const Button = defineComponent(() => {
      return () => h(SignUpButton, () => 'text')
    })
    render(Button)
    screen.getByText('text')
  })
})
