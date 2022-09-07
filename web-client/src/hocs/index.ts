import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export type GsspHoc<HocData, HocReturnProps> = <Props = unknown>(
  next: (
    ctx: GetServerSidePropsContext,
    data: HocData,
  ) => GetServerSidePropsResult<Props> | Promise<GetServerSidePropsResult<Props>>,
) => GetServerSideProps<Props & HocReturnProps>

export * from './withAuth'
export * from './withReactQuery'
