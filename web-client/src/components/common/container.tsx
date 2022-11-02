import { Container as ChakraContainer, ContainerProps, Flex, forwardRef } from '@chakra-ui/react'

export const Container = forwardRef<ContainerProps, 'div'>(({ children, ...rest }, ref) => {
  return (
    <ChakraContainer ref={ref} as={Flex} maxW="container.xl" {...rest}>
      {children}
    </ChakraContainer>
  )
})
