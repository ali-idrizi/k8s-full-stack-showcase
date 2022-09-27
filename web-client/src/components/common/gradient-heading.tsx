import { useBrandColors } from '@/hooks'
import { Heading, HeadingProps } from '@chakra-ui/react'

export const GradientHeading: React.FC<React.PropsWithChildren<HeadingProps>> = ({ ...props }) => {
  const { primary, secondary } = useBrandColors()

  return <Heading bgGradient={`linear(to-r, ${primary}, ${secondary})`} bgClip="text" {...props} />
}
