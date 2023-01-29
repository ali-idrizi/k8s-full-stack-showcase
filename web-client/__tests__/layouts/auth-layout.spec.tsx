import { Chakra } from '@/components'
import { render, screen } from '@testing-library/react'
import { AuthLayout } from '@/layouts'

describe('AuthLayout', () => {
  it('should render the content', async () => {
    render(
      <Chakra ssrColorMode="dark">
        <AuthLayout>
          <p data-testid="test-content">test-content</p>
        </AuthLayout>
      </Chakra>,
    )

    const layoutContent = screen.getByTestId('auth-layout-content')
    const content = screen.getByTestId('test-content')

    expect(layoutContent).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })
})
