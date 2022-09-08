import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export type GsspHoc<HocData, HocReturnProps> = <
  Props extends Record<string, unknown> = Record<string, unknown>,
>(
  next: (
    ctx: GetServerSidePropsContext,
    data: HocData,
  ) => GetServerSidePropsResult<Props> | Promise<GetServerSidePropsResult<Props>>,
) => GetServerSideProps<Props & HocReturnProps>

export * from './withAuth'
export * from './withReactQuery'
