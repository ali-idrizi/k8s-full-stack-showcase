import { ApiErrorAlert, LabelInput } from '@/components'
import { useBrandColors, useLoginMutation } from '@/hooks'
import { AuthLayout } from '@/layouts'
import { PageWithLayout } from '@/utils/types'
import { Button, Flex, FormControl, Heading, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FiAtSign, FiKey } from 'react-icons/fi'

const Login: PageWithLayout = () => {
  const { primary, primaryScheme } = useBrandColors()
  const { mutate, error, isLoading } = useLoginMutation()

  const formik = useFormik({
    initialValues: {
      email: 'rachel.howell@reqres.in',
      password: 'rachel',
    },
    onSubmit: (values) => {
      mutate(values)
    },
  })

  return (
    <Flex w={{ base: 'full', lg: 96 }} maxW="96" flexDir="column" alignItems="stretch" mx="auto">
      <Heading as="h1" mb="8" color={primary} lineHeight="tall">
        Login
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <VStack spacing="8" mx="auto">
          <ApiErrorAlert error={error} />

          <FormControl>
            <LabelInput
              id="email"
              label="Email Address"
              type="text"
              autoFocus
              iconAs={FiAtSign}
              onChange={formik.handleChange}
              value={formik.values.email}
              focusBorderColor={primary}
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
              focusBorderColor={primary}
            />
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
