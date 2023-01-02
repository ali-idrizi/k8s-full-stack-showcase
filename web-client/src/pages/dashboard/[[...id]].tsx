import { TodoTabs } from '@/components'
import { withAuth, withAuthenticatedRoute, withCookiesProp, withHocs, withReactQuery } from '@/hocs'
import { withApi } from '@/hocs/with-api'
import { EmptyLayout } from '@/layouts'
import { QUERY_KEY } from '@/utils/constants'
import { PageWithLayout, TodoList } from '@/utils/types'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const getServerSideProps = withHocs(
  withCookiesProp,
  withReactQuery,
  withAuth,
  withAuthenticatedRoute(),
  withApi,
)(async ({ queryClient, api }, ctx) => {
  let lists: TodoList[] = []
  try {
    lists = await queryClient.fetchQuery(
      [QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS],
      api.todo.list.getAll,
    )
  } catch (e) {}

  // Find the list based on URL parameter, if it doesn't exist, then find the default list.
  // If there is no default list, then simply select the first list.
  const paramListId = ctx.params?.id?.[0]
  const activeList =
    lists.find((list) => list.id === paramListId) ?? lists.find((list) => list.default) ?? lists[0]

  const listId = activeList?.id

  if (listId) {
    if (paramListId !== listId) {
      return {
        redirect: {
          destination: `/dashboard/${listId}`,
          permanent: false,
        },
      }
    }

    await queryClient.prefetchQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, listId], () =>
      api.todo.list.getOne(listId),
    )
  }

  return {
    props: {},
  }
})

const Dashboard: PageWithLayout = () => {
  const router = useRouter()
  const listId = router.query.id?.[0] ?? null

  return (
    <Flex py={{ base: 8, md: 12 }} justifyContent="center">
      <TodoTabs activeListId={listId} />
    </Flex>
  )
}

Dashboard.getLayout = (page) => {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default Dashboard
