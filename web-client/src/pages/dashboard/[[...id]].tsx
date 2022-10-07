import { TodoTabs } from '@/components'
import { withAuth, withAuthenticatedRoute, withHocs, withReactQuery } from '@/hocs'
import { withApi } from '@/hocs/with-api'
import { EmptyLayout } from '@/layouts'
import { QUERY_KEY } from '@/utils/constants'
import { PageWithLayout, TodoList } from '@/utils/types'
import { Flex } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = withHocs(
  withReactQuery,
  withAuth,
  withAuthenticatedRoute,
  withApi,
)(async ({ queryClient, api }, ctx) => {
  const paramListId = ctx.params?.id?.[0]

  let lists: TodoList[] = []
  try {
    lists = await queryClient.fetchQuery(
      [QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS],
      api.todo.list.getAll,
    )
  } catch (e) {}

  const currentList =
    lists.find((list) => list.id === paramListId) ?? lists.find((list) => list.default)

  if (currentList) {
    if (paramListId !== currentList.id) {
      return {
        redirect: {
          destination: `/dashboard/${currentList.id}`,
          permanent: false,
        },
      }
    }

    await queryClient.prefetchQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, currentList.id], () =>
      api.todo.list.getOne(currentList.id),
    )
  }

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
