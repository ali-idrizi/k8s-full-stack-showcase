import { Button } from '@/components/button'
import Container from '@/components/container'
import { gssp } from '@/hocs'
import { Box, FormControl, FormLabel, Input, useColorModeValue, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { InferGetServerSidePropsType } from 'next'
import React from 'react'

export const getServerSideProps = gssp(() => {
  return {
    props: {},
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Login: React.FC<Props> = () => {
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
    <Box h="100%">
      <Container justifyContent="space-between">
        <Box>
          Create and manage your tasks and todos. Create different lists and organize your day
          better!
        </Box>

        <Box bg={useColorModeValue('white', 'gray.700')} p={6} rounded="md">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={6} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>

              <FormControl isInvalid={formik.touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>

              <Button type="submit" colorScheme="green" width="full">
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
