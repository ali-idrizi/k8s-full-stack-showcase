import { Chakra } from '@/components'
import Home from '@/pages/index'
import { render } from '@testing-library/react'

it('renders homepage unchanged', () => {
  const { container } = render(
    <Chakra>
      <Home />
    </Chakra>,
  )
  expect(container).toMatchSnapshot()
})
