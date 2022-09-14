import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

type GsspHocResult<Data, Props> = { data?: Data } & (
  | GetServerSidePropsResult<Props>
  | { props: () => Props }
)

export type GsspHoc<Data = undefined, Props = Record<string, unknown>> = (
  ctx: GetServerSidePropsContext,
) => GsspHocResult<Data, Props>

export * from './compose'
export * from './withAuth'
export * from './withReactQuery'
