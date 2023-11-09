import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { defineComponent, h } from 'vue'
import SignOutButton from '../SignOutButton.vue'

const mockSignOut = vi.fn()
const originalError = console.error

vi.mock('../../composables/useClerk', async () => {
  return {
    useClerk: () => ({
      signOut: mockSignOut,
    }),
  }
})

describe('<SignOutButton />', () => {
  beforeAll(() => {
    console.error = vi.fn()
  })

  beforeEach(() => {
    mockSignOut.mockReset()
  })

  afterAll(() => {
    console.error = originalError
  })

  it('calls clerk.signOut when clicked', async () => {
    render(SignOutButton)
    const btn = screen.getByTestId('sign-out-btn')
    userEvent.click(btn)
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled()
    })
  })

  it('uses text passed as children', async () => {
    const Button = defineComponent(() => {
      return () => h(SignOutButton, () => 'text')
    })
    render(Button)
    screen.getByText('text')
  })
})
