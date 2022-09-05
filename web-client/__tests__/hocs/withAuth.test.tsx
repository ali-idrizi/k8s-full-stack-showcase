import withAuth from '@/hocs/withAuth'
import { createMockContext, MockContext } from '@/utils/test/mockContext'

describe('With Authentication GSSP HOC', () => {
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()
  })

  it('should require access token refresh', async () => {
    ctx.context.req.headers['x-user-id'] = undefined
    ctx.context.req.headers['x-authenticated'] = 'true'

    const gssp = withAuth(() => {
      return {
        props: {},
      }
    })

    const res = await gssp(ctx.context)

    if (!('props' in res)) {
      throw new Error('`props` excepted to be returned from GSSP')
    }

    const props = await Promise.resolve(res.props)
    expect(props.auth.needsRefresh).toBe(true)
  })

  it('should retain original props', async () => {
    ctx.context.req.headers['x-user-id'] = 'test-user-id'
    ctx.context.req.headers['x-authenticated'] = 'true'

    const gssp = withAuth(() => {
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
    let gssp = withAuth(() => {
      return {
        notFound: true,
      }
    })
    let res = await gssp(ctx.context)
    expect('notFound' in res).toBe(true)

    gssp = withAuth(() => {
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
