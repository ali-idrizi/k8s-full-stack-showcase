import { mockDeep } from 'jest-mock-extended'
import { GetServerSidePropsContext } from 'next'

export type MockContext = {
  context: GetServerSidePropsContext
}

export const createMockContext = (): MockContext => {
  return {
    context: mockDeep<GetServerSidePropsContext>(),
  }
}
