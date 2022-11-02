import { Container } from '@/components'
import { DarkMode, Flex, useColorModeValue } from '@chakra-ui/react'
import { FooterHeading } from './heading'
import { FooterTechStack } from './tech-stack'

const Content = () => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      flexDir="column"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color="chakra-body-text"
      py="12"
    >
      <Container as="div">
        <FooterHeading />
        <FooterTechStack />
      </Container>
    </Flex>
  )
}

export const Footer: React.FC = () => {
  return (
    <DarkMode>
      <Content />
    </DarkMode>
  )
}
