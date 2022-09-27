import preloadAll from 'jest-next-dynamic'

import { Chakra, Header } from '@/components'
import { UseAuth } from '@/hooks'
import { QUERY_KEY } from '@/utils/constants'
import { createMockContext, MockContext } from '@/utils/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import * as router from 'next/router'

describe('Header', () => {
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    jest.spyOn(router, 'useRouter').mockReturnValue(ctx.router)

    await preloadAll()
  })

  it('should render the header', async () => {
    const queryClient = new QueryClient()

    queryClient.setQueryData<UseAuth>([QUERY_KEY.AUTH], {
      loggedIn: true,
      userId: 'test-user-id',
      needsRefresh: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Chakra>
          <Header />
        </Chakra>
      </QueryClientProvider>,
    )

    const header = await screen.findByTestId('header')
    const logo = await screen.findByTestId('logo')

    expect(header).toBeInTheDocument()
    expect(logo).toHaveTextContent('TODO')
  })
})
