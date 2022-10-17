import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { withAuth } from './with-auth'
import { withHocs } from './with-hocs'
import { withReactQuery } from './with-react-query'

type GsspHocResult<Data, Props> = { data?: Data } & (
  | GetServerSidePropsResult<Props>
  | { props: () => Props }
)

export type GsspHoc<
  Data = Record<string, unknown>,
  Props = Record<string, unknown>,
  IncomingData = Record<string, unknown>,
> = (
  data: IncomingData,
  ctx: GetServerSidePropsContext,
) => GsspHocResult<Data, Props> | Promise<GsspHocResult<Data, Props>>

export * from './with-auth'
export * from './with-authenticated-route'
export * from './with-hocs'
export * from './with-react-query'
export * from './with-unauthenticated-route'

export const gssp = withHocs(withReactQuery, withAuth)
