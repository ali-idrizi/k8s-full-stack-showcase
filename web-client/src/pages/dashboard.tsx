import { TodoTabs } from '@/components'
import { withAuth, withHocs, withReactQuery } from '@/hocs'
import { withApi } from '@/hocs/with-api'
import { EmptyLayout } from '@/layouts'
import { QUERY_KEY } from '@/utils/constants'
import { PageWithLayout } from '@/utils/types'
import { Flex } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = withHocs(
  withReactQuery,
  withAuth,
  withAuthenticatedRoute,
  withApi,
)(async ({ queryClient, api }) => {
  await queryClient.prefetchQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS], api.todo.list.getAll)

  return {
    props: {},
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Dashboard: PageWithLayout<Props> = () => {
  return (
    <Flex py={{ base: 8, md: 12 }} justifyContent="center">
      <TodoTabs />
    </Flex>
  )
}

Dashboard.getLayout = (page) => {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default Dashboard
