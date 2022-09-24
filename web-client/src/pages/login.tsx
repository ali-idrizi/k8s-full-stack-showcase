import { Button, LabelInput } from '@/components'
import { useBrandColors } from '@/hooks'
import { AuthLayout } from '@/layouts'
import { PageWithLayout } from '@/utils/types'
import { FormControl, Heading, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FiAtSign, FiKey } from 'react-icons/fi'

const Login: PageWithLayout = () => {
  const { primary, primaryScheme } = useBrandColors()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <>
      <Heading as="h1" mb={8} color={primary} lineHeight="tall">
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
    </>
  )
}

Login.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default Login
