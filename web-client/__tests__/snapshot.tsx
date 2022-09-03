import Home from '@/pages/index'
import { render } from '@testing-library/react'

it('renders homepage unchanged', () => {
  const { container } = render(<Home auth={{ userId: 'test-user-id', needsRefresh: false }} />)
  expect(container).toMatchSnapshot()
})
