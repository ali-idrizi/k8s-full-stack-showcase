import { UserApi } from '@/api'
import { ApiProvider } from '@/components'
import { WithAuth } from '@/hocs'
import { QUERY_KEY } from '@/utils/constants'
import { createMockContext, MockContext } from '@/utils/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'

import * as hooks from '@/hooks'
jest.mock('@/hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/hooks'),
}))

describe('Auth', () => {
  let ctx: MockContext

  beforeEach(() => {
    ctx = createMockContext()

    jest.spyOn(hooks, 'useRouterRef').mockReturnValue({ current: ctx.router })
    jest.spyOn(hooks, 'useApi').mockReturnValue(ctx.api)

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
      shouldRefreshToken: false,
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

    expect(hooks.useAuthQuery).toHaveBeenCalledTimes(1)
    expect(hooks.useRefreshTokenMutation).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(ctx.router.replace).toHaveBeenCalledTimes(0)
    })
  })

  it('should refresh the token and replace the route', async () => {
    UserApi.refreshToken = jest.fn().mockResolvedValue({ userId: 'test-user-id' })

    ctx.router.asPath = '/test-route'
    ctx.router.replace.mockResolvedValue(true)

    const queryClient = new QueryClient()
    queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
      userId: null,
      shouldRefreshToken: true,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <h1>heading</h1>
        </ApiProvider>
      </QueryClientProvider>,
    )

    const getHeading = () => screen.queryByRole('heading', { name: /heading/i })

    expect(getHeading()).not.toBeInTheDocument()

    await waitFor(() => {
      expect(UserApi.refreshToken).toHaveBeenCalled()
    })

    expect(ctx.router.replace).toHaveBeenCalledWith('/test-route')
    expect(getHeading()).toBeInTheDocument()
    expect(queryClient.getQueryData<WithAuth>([QUERY_KEY.AUTH])).toEqual({
      userId: 'test-user-id',
      shouldRefreshToken: false,
    })
  })

  it('should logout if refresh token fails', async () => {
    UserApi.refreshToken = jest.fn().mockRejectedValue(new Error('refresh token failed'))
    UserApi.logout = jest.fn().mockImplementation(Promise.resolve)

    const queryClient = new QueryClient()
    queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
      userId: null,
      shouldRefreshToken: true,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <h1>heading</h1>
        </ApiProvider>
      </QueryClientProvider>,
    )

    await waitFor(() => {
      expect(UserApi.refreshToken).toHaveBeenCalled()
    })

    expect(UserApi.logout).toHaveBeenCalled()
  })
})
