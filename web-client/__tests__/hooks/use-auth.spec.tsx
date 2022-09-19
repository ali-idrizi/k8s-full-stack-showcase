import { UseAuth, useAuth } from '@/hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

const TestComponent: React.FC = () => {
  const { loggedIn, userId, needsRefresh } = useAuth()

  return (
    <>
      <h2>loggedIn: {String(loggedIn)}</h2>
      <h2>userId: {userId ?? 'null'}</h2>
      <h2>needsRefresh: {String(needsRefresh)}</h2>
    </>
  )
}

describe('Use Authentication Hook', () => {
  it('should return authentication details', () => {
    const queryClient = new QueryClient()

    queryClient.setQueryData<UseAuth>(['auth'], {
      loggedIn: true,
      userId: 'test-user-id',
      needsRefresh: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>,
    )

    const loggedInHeading = screen.getByRole('heading', {
      name: /loggedIn: true/i,
    })

    const userIdHeading = screen.getByRole('heading', {
      name: /userId: test-user-id/i,
    })

    const needsRefreshHeading = screen.getByRole('heading', {
      name: /needsRefresh: false/i,
    })

    expect(loggedInHeading).toBeInTheDocument()
    expect(userIdHeading).toBeInTheDocument()
    expect(needsRefreshHeading).toBeInTheDocument()
  })

  it('should return unauthenticated if data is not set', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <TestComponent />
      </QueryClientProvider>,
    )

    const loggedInHeading = screen.getByRole('heading', {
      name: /loggedIn: false/i,
    })

    const userIdHeading = screen.getByRole('heading', {
      name: /userId: null/i,
    })

    const needsRefreshHeading = screen.getByRole('heading', {
      name: /needsRefresh: false/i,
    })

    expect(loggedInHeading).toBeInTheDocument()
    expect(userIdHeading).toBeInTheDocument()
    expect(needsRefreshHeading).toBeInTheDocument()
  })
})
