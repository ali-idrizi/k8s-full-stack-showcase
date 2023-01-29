import { Chakra } from '@/components'
import Home from '@/pages/index'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
  it('renders a heading', async () => {
    render(
      <Chakra ssrColorMode="dark">
        <Home />
      </Chakra>,
    )

    const heading = screen.getByRole('heading', {
      name: /create and manage your tasks and todos/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
