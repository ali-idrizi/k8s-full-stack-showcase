import Home from '@/pages/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

it('renders homepage unchanged', () => {
  const { container } = render(
    <QueryClientProvider client={new QueryClient()}>
      <Home auth={{ userId: 'test-user-id', needsRefresh: false }} />
    </QueryClientProvider>,
  )
  expect(container).toMatchSnapshot()
})
