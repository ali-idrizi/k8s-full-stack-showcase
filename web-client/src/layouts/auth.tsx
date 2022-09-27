import { Container, GradientHeading } from '@/components'
import { Box, Highlight, Text, useColorModeValue } from '@chakra-ui/react'

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      bgGradient={{
        lg: `linear(to-l, ${useColorModeValue('gray.50', 'whiteAlpha.50')} 50%, transparent 0%)`,
      }}
      display="flex"
      minH="full"
    >
      <Container flexDir={{ base: 'column', lg: 'row' }}>
        <Box
          data-testid="auth-layout-content"
          flexGrow={{ lg: 1 }}
          bgColor={useColorModeValue('white', 'gray.800')}
          pt={{ base: 10, lg: 16 }}
        >
          <GradientHeading
            as="h2"
            lineHeight="tall"
            fontSize={['2xl', '3xl', null, '4xl', '5xl']}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Create and manage your
            <br />
            <Text as="span" whiteSpace="nowrap">
              <Highlight
                query={['tasks', 'todos']}
                styles={{
                  px: '4',
                  py: '1',
                  rounded: 'full',
                  transition: 'background .3s',
                  bg: 'orange.100',
                  _hover: { bg: 'red.100' },
                }}
              >
                tasks and todos
              </Highlight>
            </Text>
          </GradientHeading>
        </Box>
        <Box
          flexGrow={{ base: 1, lg: 0 }}
          py={{ base: 10, lg: 16 }}
          pl={{ base: 8, lg: 12 }}
          pr={{ base: 8, lg: 0 }}
          mt={{ base: 10, lg: 0 }}
          mx={{ base: -4, lg: 0 }}
          bg={{ base: useColorModeValue('gray.50', 'whiteAlpha.50'), lg: 'none' }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}
