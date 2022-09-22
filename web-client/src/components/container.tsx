import { Container as ChakraContainer, ContainerProps, Flex } from '@chakra-ui/react'
import React from 'react'

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  ...rest
}) => {
  return (
    <ChakraContainer as={Flex} maxW="container.xl" {...rest}>
      {children}
    </ChakraContainer>
  )
}
