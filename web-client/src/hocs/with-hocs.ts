import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { GsspHoc } from '.'

type Next<Props, Data> = (
  data: Data,
  ctx: GetServerSidePropsContext,
) => GetServerSidePropsResult<Props> | Promise<GetServerSidePropsResult<Props>>

export function withHocs<A, B, C, D, E, F, G, H>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D, A>,
  hoc3: GsspHoc<E, F, A & C>,
  hoc4: GsspHoc<G, H, A & C & E>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown>>(
  next: Next<Props, A & C & E & G>,
) => GetServerSideProps<Props & B & D & F & H>

export function withHocs<A, B, C, D, E, F>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D, A>,
  hoc3: GsspHoc<E, F, A & C>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown>>(
  next: Next<Props, A & C & E>,
) => GetServerSideProps<Props & B & D & F>

export function withHocs<A, B, C, D>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D, A>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown>>(
  next: Next<Props, A & C>,
) => GetServerSideProps<Props & B & D>

export function withHocs<A, B>(
  hoc1: GsspHoc<A, B>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown>>(next: Next<Props, A>) => GetServerSideProps<Props & B>

export function withHocs(
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown>>(
  next: Next<Props, unknown>,
) => GetServerSideProps<Props> {
  return (next) => {
    return async (ctx) => {
      const hocProps = []
      const data = {}

      for (const hoc of hocs) {
        const result = await Promise.resolve(hoc(data, ctx))

        // if any of the hocs retuned `notFound` or `redirect` then return immediately
        if ('notFound' in result || 'redirect' in result) {
          return result
        }

        if ('data' in result) {
          Object.assign(data, result.data)
        }

        if ('props' in result) {
          hocProps.push(result.props)
        }
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
