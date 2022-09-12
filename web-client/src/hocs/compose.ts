import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { GsspHoc } from '.'

type Next<Props, Data> = (
  data: Data,
  ctx: GetServerSidePropsContext,
) => GetServerSidePropsResult<Props> | Promise<GetServerSidePropsResult<Props>>

export function compose<A, B, C, D, E, F, G, H>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D>,
  hoc3: GsspHoc<E, F>,
  hoc4: GsspHoc<G, H>,
  ...hocs: GsspHoc[]
): <Props>(next: Next<Props, A & C & E & G>) => GetServerSideProps<Props & B & D & F & H>

export function compose<A, B, C, D, E, F>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D>,
  hoc3: GsspHoc<E, F>,
  ...hocs: GsspHoc[]
): <Props>(next: Next<Props, A & C & E>) => GetServerSideProps<Props & B & D & F>

export function compose<A, B, C, D>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D>,
  ...hocs: GsspHoc[]
): <Props>(next: Next<Props, A & C>) => GetServerSideProps<Props & B & D>

export function compose<A, B>(
  hoc1: GsspHoc<A, B>,
  ...hocs: GsspHoc[]
): <Props>(next: Next<Props, A>) => GetServerSideProps<Props & B>

export function compose(
  ...hocs: GsspHoc[]
): <Props>(next: Next<Props, unknown>) => GetServerSideProps<Props> {
  return (next) => {
    return async (ctx) => {
      const hocResults = hocs.map((hoc) => hoc(ctx))

      const hocProps = []
      const data = {}

      for (const result of hocResults) {
        // if any of the hocs retuned `notFound` or `redirect` then return immediately
        if (!('props' in result)) {
          return result
        }

        if (result.data !== undefined) {
          Object.assign(data, result.data)
        }

        hocProps.push(result.props)
      }

      const nextResult = await Promise.resolve(next(data, ctx))

      if (!('props' in nextResult)) {
        return nextResult
      }

      const result = {
        props: await Promise.resolve(nextResult.props),
      }

      for (const props of hocProps) {
        if (typeof props === 'function') {
          Object.assign(result.props, props())
        } else {
          Object.assign(result.props, await Promise.resolve(props))
        }
      }

      return result
    }
  }
}
