import { Auth } from '@/components'
import { WithAuth } from '@/hocs'
import { QUERY_KEY } from '@/utils/constants'
import { createMockContext, MockContext } from '@/utils/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'

import * as api from '@/api'
import * as hooks from '@/hooks'
import * as router from 'next/router'

jest.mock('@/api', () => ({
  __esModule: true,
  get API() {
    return null
  },
}))

jest.mock('@/hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/hooks'),
}))

describe('Auth', () => {
  let ctx: MockContext

  beforeEach(() => {
    ctx = createMockContext()

    jest.spyOn(api, 'API', 'get').mockReturnValue(ctx.api)
    jest.spyOn(router, 'useRouter').mockReturnValue(ctx.router)
    jest.spyOn(hooks, 'useAuthQuery')
    jest.spyOn(hooks, 'useRefreshTokenMutation')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the children', async () => {
    const queryClient = new QueryClient()

    queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
      userId: null,
      needsRefresh: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Auth>
          <h1>heading</h1>
        </Auth>
      </QueryClientProvider>,
    )

    const heading = screen.getByRole('heading', {
      name: /heading/i,
    })

    expect(heading).toBeInTheDocument()

    expect(hooks.useAuthQuery).toHaveBeenCalledTimes(1)
    expect(hooks.useRefreshTokenMutation).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(ctx.router.replace).toHaveBeenCalledTimes(0)
    })
  })

  it('should refresh the token and replace the route', async () => {
    ctx.router.asPath = '/test-route'
    ctx.router.replace.mockResolvedValue(true)
    ctx.api.user.refreshToken.mockResolvedValue({ userId: 'test-user-id' })

    const queryClient = new QueryClient()
    queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
      userId: null,
      needsRefresh: true,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Auth>
          <h1>heading</h1>
        </Auth>
      </QueryClientProvider>,
    )

    const getHeading = () => screen.queryByRole('heading', { name: /heading/i })

    expect(getHeading()).not.toBeInTheDocument()

    await waitFor(() => {
      expect(ctx.api.user.refreshToken).toHaveBeenCalled()
    })

    expect(ctx.router.replace).toHaveBeenCalledWith('/test-route')
    expect(getHeading()).toBeInTheDocument()
    expect(queryClient.getQueryData<WithAuth>([QUERY_KEY.AUTH])).toEqual({
      userId: 'test-user-id',
      needsRefresh: false,
    })
  })
})
