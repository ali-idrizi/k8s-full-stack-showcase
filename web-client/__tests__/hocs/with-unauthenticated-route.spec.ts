import { withAuth, withHocs, withReactQuery, withUnauthenticatedRoute } from '@/hocs'
import { createMockContext, MockContext } from '@/utils/test'

describe('With Unauthentication Route GSSP HOC', () => {
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()
  })

  it('should redirect to homepage', async () => {
    ctx.context.req.headers['x-user-id'] = undefined
    ctx.context.req.headers['x-authenticated'] = 'true'

    const gssp = withHocs(withReactQuery, withAuth, withUnauthenticatedRoute)()

    const res = await gssp(ctx.context)

    expect(res).toEqual({
      redirect: {
        destination: '/',
        permanent: false,
      },
    })
  })

  it('should return the props', async () => {
    ctx.context.req.headers['x-user-id'] = undefined
    ctx.context.req.headers['x-authenticated'] = undefined

    const gssp = withHocs(
      withReactQuery,
      withAuth,
      withUnauthenticatedRoute,
    )(() => ({
      props: {
        foo: 'bar',
      },
    }))

    const res = await gssp(ctx.context)

    if (!('props' in res)) {
      throw new Error('`props` excepted to be returned from GSSP')
    }

    const props = await Promise.resolve(res.props)
    expect(props.foo).toBe('bar')
  })
})
