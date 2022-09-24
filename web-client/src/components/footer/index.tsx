import { Box, useColorModeValue } from '@chakra-ui/react'

export const Footer: React.FC = () => {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} as="footer" py={5} textAlign="center">
      Footer
    </Box>
  )
}
