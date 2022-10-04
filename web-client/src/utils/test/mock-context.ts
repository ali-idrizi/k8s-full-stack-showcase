import { AxiosInstance } from 'axios'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { GetServerSidePropsContext } from 'next'
import { NextRouter } from 'next/router'
import { UserApi } from '@/api'

export type MockContext = {
  api: {
    user: DeepMockProxy<typeof UserApi>
  }
  context: DeepMockProxy<GetServerSidePropsContext>
  router: DeepMockProxy<NextRouter>
  axios: DeepMockProxy<AxiosInstance>
}

export const createMockContext = (): MockContext => {
  return {
    api: {
      user: mockDeep(),
    },
    context: mockDeep(),
    router: mockDeep(),
    axios: mockDeep(),
  }
}
