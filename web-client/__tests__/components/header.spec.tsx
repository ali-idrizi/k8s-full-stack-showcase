import preloadAll from 'jest-next-dynamic'

import { Chakra } from '@/components'
import Header from '@/components/header'
import { createMockContext, MockContext } from '@/utils/test'
import { render, screen } from '@testing-library/react'

import * as router from 'next/router'

describe('Header', () => {
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    jest.spyOn(router, 'useRouter').mockReturnValue(ctx.router)

    await preloadAll()
  })

  it('should render the header', async () => {
    render(
      <Chakra>
        <Header />
      </Chakra>,
    )

    const header = await screen.findByTestId('header')
    const logo = await screen.findByTestId('logo')

    expect(header).toBeInTheDocument()
    expect(logo).toHaveTextContent('TODO')
  })
})
