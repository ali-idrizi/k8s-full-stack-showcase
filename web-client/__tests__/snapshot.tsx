import { Chakra } from '@/components'
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
      <Chakra>
        <Home />
      </Chakra>
    </QueryClientProvider>,
  )
  expect(container).toMatchSnapshot()
})
