import { withHocs, withReactQuery } from '@/hocs'
import { createMockContext, MockContext } from '@/utils/test'

const getMockData = jest.fn().mockResolvedValue({
  foo: 'bar',
})

describe('With React Query GSSP HOC', () => {
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()
  })

  it('should correctly dehydrate the state', async () => {
    const gssp = withHocs(withReactQuery)(async ({ queryClient }) => {
      await queryClient.prefetchQuery(['todos'], getMockData)

      return {
        props: {},
      }
    })

    const res = await gssp(ctx.context)

    if (!('props' in res)) {
      throw new Error('`props` excepted to be returned from GSSP')
    }

    const props = await Promise.resolve(res.props)

    expect(props.dehydratedState).toBeTruthy()
    expect(props.dehydratedState?.queries.at(0)?.state.data).toEqual({ foo: 'bar' })
  })

  it('should retain original props', async () => {
    const gssp = withHocs(withReactQuery)(() => {
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
    let gssp = withHocs(withReactQuery)(() => {
      return {
        notFound: true,
      }
    })
    let res = await gssp(ctx.context)
    expect('notFound' in res).toBe(true)

    gssp = withHocs(withReactQuery)(() => {
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
