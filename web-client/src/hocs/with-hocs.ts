import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { GsspHoc } from '.'

type Next<Props, Data> = (
  data: Data,
  ctx: GetServerSidePropsContext,
) => GetServerSidePropsResult<Props> | Promise<GetServerSidePropsResult<Props>>

export function withHocs<A, B, C, D, E, F, G, H, I, J, K, L>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D, A>,
  hoc3: GsspHoc<E, F, A & C>,
  hoc4: GsspHoc<G, H, A & C & E>,
  hoc5: GsspHoc<I, J, A & C & E & G>,
  hoc6: GsspHoc<K, L, A & C & E & G & I>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown> = {}>( // eslint-disable-line
  next?: Next<Props, A & C & E & G & I & K>,
) => GetServerSideProps<Props & B & D & F & H & J & L>

export function withHocs<A, B, C, D, E, F, G, H, I, J>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D, A>,
  hoc3: GsspHoc<E, F, A & C>,
  hoc4: GsspHoc<G, H, A & C & E>,
  hoc5: GsspHoc<I, J, A & C & E & G>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown> = {}>( // eslint-disable-line
  next?: Next<Props, A & C & E & G & I>,
) => GetServerSideProps<Props & B & D & F & H & J>

export function withHocs<A, B, C, D, E, F, G, H>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D, A>,
  hoc3: GsspHoc<E, F, A & C>,
  hoc4: GsspHoc<G, H, A & C & E>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown> = {}>( // eslint-disable-line
  next?: Next<Props, A & C & E & G>,
) => GetServerSideProps<Props & B & D & F & H>

export function withHocs<A, B, C, D, E, F>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D, A>,
  hoc3: GsspHoc<E, F, A & C>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown> = {}>( // eslint-disable-line
  next?: Next<Props, A & C & E>,
) => GetServerSideProps<Props & B & D & F>

export function withHocs<A, B, C, D>(
  hoc1: GsspHoc<A, B>,
  hoc2: GsspHoc<C, D, A>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown> = {}>( // eslint-disable-line
  next?: Next<Props, A & C>,
) => GetServerSideProps<Props & B & D>

export function withHocs<A, B>(
  hoc1: GsspHoc<A, B>,
  ...hocs: GsspHoc[]
): <Props extends Record<string, unknown> = {}>( // eslint-disable-line
  next: Next<Props, A>,
) => GetServerSideProps<Props & B>

export function withHocs(
  ...hocs: GsspHoc[]
): (next?: Next<unknown, unknown>) => GetServerSideProps {
  return (next) => {
    return async (ctx) => {
      const hocProps = []
      const data = {}

      for (const hoc of hocs) {
        const hocResult = await Promise.resolve(hoc(data, ctx))

        // if any of the hocs retuned `notFound` or `redirect` then return immediately
        if ('notFound' in hocResult || 'redirect' in hocResult) {
          return hocResult
        }

        if ('data' in hocResult) {
          Object.assign(data, hocResult.data)
        }

        if ('props' in hocResult) {
          hocProps.push(hocResult.props)
        }
      }

      const result = {
        props: {},
      }

      if (next !== undefined) {
        const nextResult = await Promise.resolve(next(data, ctx))

        if (!('props' in nextResult)) {
          return nextResult
        }

        Object.assign(result.props, await Promise.resolve(nextResult.props))
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
