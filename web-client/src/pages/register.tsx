import { RegisterSchema } from '@/api/user/register'
import { ApiErrorAlert, LabelInput } from '@/components'
import { useBrandColors, useRegisterMutation } from '@/hooks'
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
import { FiAtSign, FiKey, FiUser } from 'react-icons/fi'

const Register: PageWithLayout = () => {
  const router = useRouter()
  const toast = useToast()
  const { secondary, secondaryScheme } = useBrandColors()
  const { mutate, error, isLoading } = useRegisterMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          toast({
            position: 'bottom-right',
            description: 'You have successfully registered!',
            status: 'success',
            isClosable: true,
            duration: 5000,
            variant: 'subtle',
          })
          router.push('/')
        },
      })
    },
    validationSchema: RegisterSchema,
  })

  return (
    <Flex w={{ base: 'full', lg: 96 }} maxW="96" flexDir="column" alignItems="stretch" mx="auto">
      <Heading as="h1" color={secondary} lineHeight="tall">
        Register
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <ApiErrorAlert mt="8" w="full" error={error} />

        <VStack spacing="8" pt="8" mx="auto">
          <FormControl isInvalid={!!formik.errors.name && formik.touched.name}>
            <LabelInput
              id="name"
              label="Name"
              type="text"
              iconAs={FiUser}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              focusBorderColor={secondary}
            />

            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
            <LabelInput
              id="email"
              label="Email Address"
              type="text"
              iconAs={FiAtSign}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              focusBorderColor={secondary}
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
              focusBorderColor={secondary}
            />

            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
          >
            <LabelInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              iconAs={FiKey}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              focusBorderColor={secondary}
            />

            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={isLoading} colorScheme={secondaryScheme} width="full">
            Register
          </Button>
        </VStack>
      </form>
    </Flex>
  )
}

Register.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default Register
