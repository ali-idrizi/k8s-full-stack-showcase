import preloadAll from 'jest-next-dynamic'

import { Header } from '@/components'
import { createMockContext, MockContext } from '@/utils/test'
import { render, screen } from '@testing-library/react'

import * as router from 'next/router'

const logError = console.error

describe('Header', () => {
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    jest.spyOn(router, 'useRouter').mockReturnValue(ctx.router)

    await preloadAll()
  })

  it('should render the header', async () => {
    // ignore console.error thrown because of gradient button props,
    // see https://github.com/chakra-ui/chakra-ui/issues/6706
    jest.spyOn(console, 'error').mockImplementation((error: unknown) => {
      if (typeof error === 'string') {
        if (error.match(/react does not recognize the/i)) {
          return
        }
      }
      logError(error)
    })

    render(<Header />)

    const header = await screen.findByTestId('header')
    const logo = await screen.findByTestId('logo')

    expect(header).toBeInTheDocument()
    expect(logo).toHaveTextContent('TODO')
  })
})
