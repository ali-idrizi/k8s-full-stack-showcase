import { CTAButton, GradientHeading } from '@/components'
import { gssp } from '@/hocs'
import { useBrandColors } from '@/hooks'
import { EmptyLayout } from '@/layouts'
import { PageWithLayout } from '@/utils/types'
import { Heading, Highlight, Stack, Text, VStack } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = gssp(async () => {
  return {
    props: {},
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: PageWithLayout<Props> = () => {
  const { primaryScheme, secondaryScheme } = useBrandColors()

  return (
    <VStack spacing={{ base: 14, md: 20 }} py={{ base: 14, md: 20 }}>
      <GradientHeading
        as="h2"
        flexGrow="1"
        lineHeight="tall"
        fontSize={['2xl', '4xl', null, '5xl']}
        textAlign="center"
      >
        Create and manage your{' '}
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

      <Heading as="h2" textAlign="center" fontSize={['2xl', '3xl']}>
        Create different lists and organize your day better!
      </Heading>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        spacing="2"
        w="full"
      >
        <CTAButton href="/login" colorScheme={primaryScheme}>
          Login
        </CTAButton>

        <CTAButton href="/register" colorScheme={secondaryScheme}>
          Register
        </CTAButton>
      </Stack>
    </VStack>
  )
}

Home.getLayout = (page) => {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default Home
