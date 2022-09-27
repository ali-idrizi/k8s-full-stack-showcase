import { Container } from '@/components'

export const EmptyLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container flexDir="column" py="4">
      {children}
    </Container>
  )
}
