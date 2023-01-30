import { ApiProvider } from '@/components'
import { WithAuth } from '@/hocs'
import { QUERY_KEY } from '@/utils/constants'
import { createMockContext, MockContext } from '@/utils/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import * as router from 'next/router'

describe('Auth', () => {
  let ctx: MockContext

  beforeEach(() => {
    ctx = createMockContext()

    jest.spyOn(router, 'useRouter').mockReturnValue(ctx.router)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the children', async () => {
    const queryClient = new QueryClient()

    queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
      userId: null,
      hasAuthTokens: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <h1>heading</h1>
        </ApiProvider>
      </QueryClientProvider>,
    )

    const heading = screen.getByRole('heading', {
      name: /heading/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
