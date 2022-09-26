import { GradientHeading } from '@/components'
import { gssp } from '@/hocs'
import { useBrandColors } from '@/hooks'
import { EmptyLayout } from '@/layouts'
import { PageWithLayout } from '@/utils/types'
import { Button, Heading, Highlight, Stack, Text, VStack } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export const getServerSideProps = gssp(async () => {
  return {
    props: {},
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: PageWithLayout<Props> = () => {
  const { primaryScheme, secondaryScheme } = useBrandColors()

  return (
    <VStack spacing={{ base: 16, md: 20 }}>
      <GradientHeading
        as="h2"
        mt={20}
        flexGrow={1}
        lineHeight="tall"
        fontSize={['2xl', '4xl', null, '5xl', '5xl']}
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

      <Heading textAlign="center" fontSize="3xl">
        Create different lists and organize your day better!
      </Heading>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
        w="full"
      >
        <Link href="/login" passHref>
          <Button
            as="a"
            variant="solid"
            size="lg"
            colorScheme={primaryScheme}
            borderRadius="full"
            px={14}
            py={7}
            fontSize="xl"
            w={{ base: 'full', md: 52 }}
            maxW={64}
          >
            Login
          </Button>
        </Link>

        <Link href="/login" passHref>
          <Button
            as="a"
            variant="solid"
            size="lg"
            colorScheme={secondaryScheme}
            borderRadius="full"
            px={14}
            py={7}
            fontSize="xl"
            w={{ base: 'full', md: 52 }}
            maxW={64}
          >
            Register
          </Button>
        </Link>
      </Stack>
    </VStack>
  )
}

Home.getLayout = (page) => {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default Home
