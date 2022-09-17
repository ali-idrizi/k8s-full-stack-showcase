import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { withAuth } from './withAuth'
import { withHocs } from './withHocs'
import { withReactQuery } from './withReactQuery'

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

export * from './withAuth'
export * from './withHocs'
export * from './withReactQuery'

export const gssp = withHocs(withReactQuery, withAuth)
