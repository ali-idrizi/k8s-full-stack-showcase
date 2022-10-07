import { TodoTabs } from '@/components'
import { withAuth, withAuthenticatedRoute, withHocs, withReactQuery } from '@/hocs'
import { withApi } from '@/hocs/with-api'
import { useRouterRef } from '@/hooks'
import { EmptyLayout } from '@/layouts'
import { QUERY_KEY } from '@/utils/constants'
import { PageWithLayout, TodoList } from '@/utils/types'
import { Alert, AlertIcon, Flex } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useEffect } from 'react'

export const getServerSideProps = withHocs(
  withReactQuery,
  withAuth,
  withAuthenticatedRoute,
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
  const paramListId = ctx.params?.id?.[0] ?? null
  const activeList =
    lists.find((list) => list.id === paramListId) ?? lists.find((list) => list.default) ?? lists[0]

  if (activeList) {
    await queryClient.prefetchQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, activeList.id], () =>
      api.todo.list.getOne(activeList.id),
    )
  }

  return {
    props: {
      paramListId,
      listId: activeList?.id ?? null,
    },
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Dashboard: PageWithLayout<Props> = ({ paramListId, listId }) => {
  const routerRef = useRouterRef()

  useEffect(() => {
    if (listId && listId !== paramListId) {
      routerRef.current.replace(`/dashboard/${listId}`, undefined, {
        shallow: true,
      })
    }
  }, [listId, paramListId, routerRef])

  return (
    <Flex py={{ base: 8, md: 12 }} justifyContent="center">
      {listId ? (
        <TodoTabs listId={listId} />
      ) : (
        <Alert status="error" rounded="md">
          <AlertIcon />A server error occurred! Please contact us for assistance.
        </Alert>
      )}
    </Flex>
  )
}

Dashboard.getLayout = (page) => {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default Dashboard
