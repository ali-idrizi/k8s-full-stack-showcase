import Home from '@/pages/index'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home auth={{ userId: 'test-user-id', needsRefresh: false }} />)

    const heading = screen.getByRole('heading', {
      name: /welcome test-user-id/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
