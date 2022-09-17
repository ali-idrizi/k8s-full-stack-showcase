import { withHocs, GsspHoc } from '@/hocs'
import { createMockContext, MockContext } from '@/utils/test/mockContext'

const testHoc: GsspHoc<{ foo: string }> = jest.fn().mockReturnValue({
  data: { foo: 'bar' },
  props: {},
})

const propsHoc: GsspHoc = jest.fn().mockReturnValue({
  props: { quux: 'quuz' },
})

const notFoundHoc: GsspHoc = jest.fn().mockReturnValue({
  notFound: true,
})

describe('Compose GSSP HOCs', () => {
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call hoc and return props', async () => {
    const gssp = withHocs(testHoc)(({ foo }) => {
      return {
        props: {
          foo,
          baz: 'qux',
        },
      }
    })

    const res = await gssp(ctx.context)

    if (!('props' in res)) {
      throw new Error('`props` excepted to be returned from GSSP')
    }

    expect(testHoc).toHaveBeenCalledTimes(1)
    expect(res.props).toEqual({ foo: 'bar', baz: 'qux' })
  })

  it('should call multiple hocs and return all props', async () => {
    const gssp = withHocs(
      testHoc,
      propsHoc,
    )(({ foo }) => {
      return {
        props: {
          foo,
          baz: 'qux',
        },
      }
    })

    const res = await gssp(ctx.context)

    if (!('props' in res)) {
      throw new Error('`props` excepted to be returned from GSSP')
    }

    expect(testHoc).toHaveBeenCalledTimes(1)
    expect(propsHoc).toHaveBeenCalledTimes(1)
    expect(res.props).toEqual({ foo: 'bar', baz: 'qux', quux: 'quuz' })
  })

  it('should return when props is not passed from HOC', async () => {
    const gssp = withHocs(notFoundHoc)(() => {
      return {
        props: {},
      }
    })

    const res = await gssp(ctx.context)

    expect('notFound' in res).toBe(true)
  })
})
