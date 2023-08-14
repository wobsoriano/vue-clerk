import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { defineComponent, h } from 'vue'
import { SignInButton } from '../../src/index'

const mockRedirectToSignIn = vi.fn()
const originalError = console.error

vi.mock('../../src/composables/useClerk', async () => {
  return {
    useClerk: () => ({
      redirectToSignIn: mockRedirectToSignIn,
    }),
  }
})

const url = 'https://www.clerk.com'

describe('<SignInButton />', () => {
  beforeAll(() => {
    console.error = vi.fn()
  })

  afterAll(() => {
    console.error = originalError
  })

  beforeEach(() => {
    mockRedirectToSignIn.mockReset()
  })

  it('calls clerk.redirectToSignIn when clicked', async () => {
    render(SignInButton)
    const btn = screen.getByTestId('sign-in-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(mockRedirectToSignIn).toHaveBeenCalled()
    })
  })

  it('handles redirectUrl prop', async () => {
    render(SignInButton, {
      props: {
        redirectUrl: url,
      },
    })
    const btn = screen.getByTestId('sign-in-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(mockRedirectToSignIn).toHaveBeenCalledWith({ redirectUrl: url })
    })
  })

  it('handles afterSignInUrl prop', async () => {
    render(SignInButton, {
      props: {
        afterSignInUrl: url,
      },
    })
    const btn = screen.getByTestId('sign-in-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(mockRedirectToSignIn).toHaveBeenCalledWith({
        afterSignInUrl: url,
      })
    })
  })

  it('handles afterSignUpUrl prop', async () => {
    render(SignInButton, {
      props: {
        afterSignUpUrl: url,
      },
    })
    const btn = screen.getByTestId('sign-in-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(mockRedirectToSignIn).toHaveBeenCalledWith({
        afterSignUpUrl: url,
      })
    })
  })

  it('renders passed button and calls both click handlers', async () => {
    const handler = vi.fn()

    const Button = defineComponent(() => {
      return () => h(SignInButton, {
        onClick: handler,
      }, () => 'custom button')
    })

    render(Button)

    const btn = screen.getByTestId('sign-in-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(handler).toHaveBeenCalled()
      expect(mockRedirectToSignIn).toHaveBeenCalled()
    })
  })

  it('uses text passed as children', async () => {
    const Button = defineComponent(() => {
      return () => h(SignInButton, () => 'text')
    })
    render(Button)
    screen.getByText('text')
  })
})
