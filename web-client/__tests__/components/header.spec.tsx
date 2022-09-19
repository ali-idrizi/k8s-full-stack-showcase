import { Header } from '@/components'
import { render, screen } from '@testing-library/react'

const logError = console.error

describe('Header', () => {
  it('should render the header', async () => {
    // ignore console.error thrown because of gradient button props,
    // see https://github.com/chakra-ui/chakra-ui/issues/6706
    jest.spyOn(console, 'error').mockImplementation((error) => {
      if (!error.match(/react does not recognize the/i)) {
        logError(error)
      }
    })

    render(<Header />)

    const header = await screen.findByTestId('header')
    const logo = await screen.findByTestId('logo')

    expect(header).toBeInTheDocument()
    expect(logo).toHaveTextContent('TODO')
  })
})
