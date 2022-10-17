import { Api } from '@/api'
import { AxiosInstance } from 'axios'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { GetServerSidePropsContext } from 'next'
import { NextRouter } from 'next/router'

export type MockContext = {
  api: DeepMockProxy<Api>
  context: DeepMockProxy<GetServerSidePropsContext>
  router: DeepMockProxy<NextRouter>
  axios: DeepMockProxy<AxiosInstance>
}

export const createMockContext = (): MockContext => {
  return {
    api: mockDeep(),
    context: mockDeep(),
    router: mockDeep(),
    axios: mockDeep(),
  }
}
