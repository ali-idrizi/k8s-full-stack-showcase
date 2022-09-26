import { LabelInput } from '@/components'
import { useBrandColors } from '@/hooks'
import { AuthLayout } from '@/layouts'
import { PageWithLayout } from '@/utils/types'
import { Button, Flex, FormControl, Heading, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FiAtSign, FiKey, FiUser } from 'react-icons/fi'

const Register: PageWithLayout = () => {
  const { secondary, secondaryScheme } = useBrandColors()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Flex w={{ base: 'full', lg: 96 }} maxW={96} flexDir="column" alignItems="stretch" mx="auto">
      <Heading as="h1" mb={8} color={secondary} lineHeight="tall">
        Register
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={8} mx="auto">
          <FormControl>
            <LabelInput
              id="name"
              label="Name"
              type="text"
              autoFocus
              iconAs={FiUser}
              onChange={formik.handleChange}
              value={formik.values.name}
              focusBorderColor={secondary}
            />
          </FormControl>

          <FormControl>
            <LabelInput
              id="email"
              label="Email Address"
              type="text"
              iconAs={FiAtSign}
              onChange={formik.handleChange}
              value={formik.values.email}
              focusBorderColor={secondary}
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
              focusBorderColor={secondary}
            />
          </FormControl>

          <FormControl>
            <LabelInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              iconAs={FiKey}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              focusBorderColor={secondary}
            />
          </FormControl>

          <Button type="submit" colorScheme={secondaryScheme} width="full">
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
