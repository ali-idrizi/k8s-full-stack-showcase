import { Button, Container, GradientHeading, LabelInput } from '@/components'
import { useBrandColors } from '@/hooks'
import {
  Box,
  FormControl,
  Heading,
  Highlight,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FiAtSign, FiKey } from 'react-icons/fi'

const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const { primary, primaryScheme } = useBrandColors()

  return (
    <Box
      bgGradient={{
        lg: `linear(to-l, ${useColorModeValue('gray.50', 'whiteAlpha.50')} 50%, transparent 0%)`,
      }}
      display="flex"
      minH="full"
    >
      <Container flexDir={{ base: 'column', lg: 'row' }} justifyContent={{ lg: 'space-between' }}>
        <Box flexGrow={{ lg: 1 }} bg={useColorModeValue('white', 'gray.800')}>
          <GradientHeading
            as="h2"
            lineHeight="tall"
            mt={{ base: 10, lg: 16 }}
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
                  bg: 'orange.100',
                  rounded: 'full',
                  transition: 'background .3s',
                  _hover: { bg: 'red.100' },
                }}
              >
                tasks and todos
              </Highlight>
            </Text>
          </GradientHeading>
        </Box>
        <Box
          minW="28rem"
          borderStyle="solid"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          borderLeftWidth={{ lg: 10 }}
          flexGrow={{ base: 1, lg: 0 }}
          pl={{ base: 8, lg: 12 }}
          pr={{ base: 8, lg: 0 }}
          mt={{ base: 10, lg: 0 }}
          mx={{ base: -4, lg: 0 }}
          bg={{ base: useColorModeValue('gray.50', 'whiteAlpha.50'), lg: 'none' }}
        >
          <Heading as="h1" mt={{ base: 10, lg: 16 }} mb={8} color={primary} lineHeight="tall">
            Login
          </Heading>

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={8} align="flex-start">
              <FormControl>
                <LabelInput
                  id="email"
                  label="Email Address"
                  type="text"
                  autoFocus
                  iconAs={FiAtSign}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>

              <FormControl>
                <LabelInput
                  id="password"
                  label="Password"
                  type="password"
                  iconAs={FiKey}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>

              <Button type="submit" colorScheme={primaryScheme} width="full">
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  )
}

export default Login
