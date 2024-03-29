import { WithAuth } from '@/hocs'
import { useAuth } from '@/hooks'
import { QUERY_KEY } from '@/utils/constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

const TestComponent: React.FC = () => {
  const { isLoggedIn, userId } = useAuth()

  return (
    <>
      <h2>isLoggedIn: {String(isLoggedIn)}</h2>
      <h2>userId: {userId ?? 'null'}</h2>
    </>
  )
}

describe('Use Authentication Hook', () => {
  it('should return authentication details', () => {
    const queryClient = new QueryClient()

    queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
      userId: 'test-user-id',
      hasAuthTokens: true,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>,
    )

    const isLoggedInHeading = screen.getByRole('heading', {
      name: /isLoggedIn: true/i,
    })

    const userIdHeading = screen.getByRole('heading', {
      name: /userId: test-user-id/i,
    })

    expect(isLoggedInHeading).toBeInTheDocument()
    expect(userIdHeading).toBeInTheDocument()
  })

  it('should return unauthenticated if data is not set', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <TestComponent />
      </QueryClientProvider>,
    )

    const isLoggedInHeading = screen.getByRole('heading', {
      name: /isLoggedIn: false/i,
    })

    const userIdHeading = screen.getByRole('heading', {
      name: /userId: null/i,
    })

    expect(isLoggedInHeading).toBeInTheDocument()
    expect(userIdHeading).toBeInTheDocument()
  })
})
