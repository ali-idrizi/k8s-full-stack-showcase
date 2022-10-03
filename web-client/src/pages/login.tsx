import { LoginSchema } from '@/api/user/login'
import { ApiErrorAlert, LabelInput } from '@/components'
import { withAuth, withHocs, withReactQuery, withUnauthenticated } from '@/hocs'
import { useBrandColors, useLoginMutation } from '@/hooks'
import { AuthLayout } from '@/layouts'
import { PageWithLayout } from '@/utils/types'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FiAtSign, FiKey } from 'react-icons/fi'

export const getServerSideProps = withHocs(withReactQuery, withAuth, withUnauthenticated)()

const Login: PageWithLayout = () => {
  const router = useRouter()
  const toast = useToast()
  const { primary, primaryScheme } = useBrandColors()
  const { mutate, error, isLoading } = useLoginMutation()

  const formik = useFormik({
    initialValues: {
      email: 'rachel.howell@reqres.in',
      password: 'rachel',
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          toast({
            position: 'bottom-right',
            description: 'You have successfully logged in!',
            status: 'success',
            isClosable: true,
            duration: 5000,
            variant: 'subtle',
          })
          router.push('/')
        },
      })
    },
    validationSchema: LoginSchema,
  })

  return (
    <Flex w={{ base: 'full', lg: 96 }} maxW="96" flexDir="column" alignItems="stretch" mx="auto">
      <Heading as="h1" color={primary} lineHeight="tall">
        Login
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <ApiErrorAlert mt="8" w="full" error={error} />

        <VStack spacing="8" pt="8" mx="auto">
          <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
            <LabelInput
              id="email"
              label="Email Address"
              type="text"
              autoFocus
              iconAs={FiAtSign}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              focusBorderColor={primary}
            />

            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
            <LabelInput
              id="password"
              label="Password"
              type="password"
              iconAs={FiKey}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              focusBorderColor={primary}
            />

            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={isLoading} colorScheme={primaryScheme} width="full">
            Login
          </Button>
        </VStack>
      </form>
    </Flex>
  )
}

Login.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default Login
