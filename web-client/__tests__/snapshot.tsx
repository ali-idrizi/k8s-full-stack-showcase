import { WithAuth } from '@/hocs'
import Home from '@/pages/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

it('renders homepage unchanged', () => {
  const queryClient = new QueryClient()

  queryClient.setQueryData<WithAuth>(['auth'], {
    userId: 'test-user-id',
    needsRefresh: false,
  })

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  )
  expect(container).toMatchSnapshot()
})
