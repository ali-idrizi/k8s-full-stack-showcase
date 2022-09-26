import { Chakra } from '@/components'
import { WithAuth } from '@/hocs'
import Home from '@/pages/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

const getMockData = jest.fn().mockResolvedValue([{ title: 'Test' }])

describe('Home', () => {
  const queryClient = new QueryClient()

  beforeEach(async () => {
    await queryClient.fetchQuery(['todos'], getMockData)

    queryClient.setQueryData<WithAuth>(['auth'], {
      userId: 'test-user-id',
      needsRefresh: false,
    })
  })

  it('renders a heading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Chakra>
          <Home />
        </Chakra>
      </QueryClientProvider>,
    )

    const heading = screen.getByRole('heading', {
      name: /create and manage your tasks and todos/i,
    })

    expect(getMockData).toHaveBeenCalledTimes(1)
    expect(heading).toBeInTheDocument()
  })
})
