import { withAuth, withHocs, withReactQuery } from '@/hocs'
import { createMockContext, MockContext } from '@/utils/test'

describe('With Authentication GSSP HOC', () => {
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()
  })

  it('should store valid data in react-query', async () => {
    ctx.context.req.headers['x-user-id'] = undefined
    ctx.context.req.headers['x-authenticated'] = 'true'

    const gssp = withHocs(
      withReactQuery,
      withAuth,
    )(() => {
      return {
        props: {},
      }
    })

    const res = await gssp(ctx.context)

    if (!('props' in res)) {
      throw new Error('`props` excepted to be returned from GSSP')
    }

    const props = await Promise.resolve(res.props)

    expect(props.dehydratedState?.queries.at(0)?.state.data).toEqual({
      userId: null,
      hasAuthTokens: true,
    })
  })

  it('should retain original props', async () => {
    ctx.context.req.headers['x-user-id'] = 'test-user-id'
    ctx.context.req.headers['x-authenticated'] = 'true'

    const gssp = withHocs(
      withReactQuery,
      withAuth,
    )(() => {
      return {
        props: {
          foo: 'bar',
        },
      }
    })

    const res = await gssp(ctx.context)

    if (!('props' in res)) {
      throw new Error('`props` excepted to be returned from GSSP')
    }

    const props = await Promise.resolve(res.props)
    expect(props.foo).toBe('bar')
  })

  it('should return notFound and redirect from GSSP', async () => {
    let gssp = withHocs(
      withReactQuery,
      withAuth,
    )(() => {
      return {
        notFound: true,
      }
    })
    let res = await gssp(ctx.context)
    expect('notFound' in res).toBe(true)

    gssp = withHocs(
      withReactQuery,
      withAuth,
    )(() => {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    })
    res = await gssp(ctx.context)
    expect('redirect' in res).toBe(true)
  })
})
