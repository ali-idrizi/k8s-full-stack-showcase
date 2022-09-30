import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

// https://stackoverflow.com/a/71817340/1354378
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...props: unknown[]) => {
    const dynamicModule = jest.requireActual('next/dynamic')
    const dynamicActualComp = dynamicModule.default
    const RequiredComponent = dynamicActualComp(props[0])
    RequiredComponent.preload ? RequiredComponent.preload() : RequiredComponent.render.preload()
    return RequiredComponent
  },
}))
