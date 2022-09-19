import { Auth } from '@/components'
import { createMockContext, MockContext } from '@/utils/test'
import { render, screen, waitFor } from '@testing-library/react'

import * as hooks from '@/hooks'
import * as router from 'next/router'

jest.mock('@/hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/hooks'),
}))

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
    jest.spyOn(hooks, 'useAuth').mockReturnValueOnce({
      userId: null,
      needsRefresh: false,
    })

    render(
      <Auth>
        <h1>heading</h1>
      </Auth>,
    )

    const heading = screen.getByRole('heading', {
      name: /heading/i,
    })

    expect(heading).toBeInTheDocument()

    expect(hooks.useAuth).toHaveBeenCalledTimes(1)
    expect(ctx.router.replace).toHaveBeenCalledTimes(0)
    expect(ctx.router.push).toHaveBeenCalledTimes(0)
  })

  it('should refresh the token and replace the route', async () => {
    fetchMock.mockResponse(async () => '')
    jest.spyOn(hooks, 'useAuth').mockReturnValueOnce({
      userId: null,
      needsRefresh: true,
    })

    ctx.router.asPath = '/test-route'
    ctx.router.replace.mockResolvedValue(true)

    render(
      <Auth>
        <h1>heading</h1>
      </Auth>,
    )

    const heading = screen.queryByRole('heading', {
      name: /heading/i,
    })

    await new Promise((res) => setTimeout(res, 2000))

    expect(heading).not.toBeInTheDocument()

    expect(hooks.useAuth).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledTimes(1)

    await waitFor(() => expect(ctx.router.replace).toHaveBeenCalledTimes(1))
  })
})
