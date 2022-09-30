import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { GetServerSidePropsContext } from 'next'
import { NextRouter } from 'next/router'

export type MockContext = {
  context: DeepMockProxy<GetServerSidePropsContext>
  router: DeepMockProxy<NextRouter>
}

export const createMockContext = (): MockContext => {
  return {
    context: mockDeep(),
    router: mockDeep(),
  }
}
