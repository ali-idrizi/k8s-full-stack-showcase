import { DarkMode, Flex, useColorModeValue } from '@chakra-ui/react'
import { FooterHeading } from './heading'

const Content = () => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      textAlign="center"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color="chakra-body-text"
      py="5"
    >
      <FooterHeading />
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
