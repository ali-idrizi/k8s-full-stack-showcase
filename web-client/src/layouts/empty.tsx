import { Container } from '@/components'

export const EmptyLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>
}
