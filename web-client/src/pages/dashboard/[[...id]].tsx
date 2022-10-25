import { TodoTabs } from '@/components'
import { withAuth, withAuthenticatedRoute, withHocs, withReactQuery } from '@/hocs'
import { withApi } from '@/hocs/with-api'
import { EmptyLayout } from '@/layouts'
import { QUERY_KEY } from '@/utils/constants'
import { PageWithLayout, TodoList } from '@/utils/types'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export const getServerSideProps = withHocs(
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
  const paramListId = ctx.params?.id?.[0] ?? null
  const activeList =
    lists.find((list) => list.id === paramListId) ?? lists.find((list) => list.default) ?? lists[0]
  const listId = activeList?.id ?? null

  if (activeList) {
    if (listId !== paramListId) {
      return {
        redirect: {
          destination: `/dashboard/${listId}`,
          permanent: false,
        },
      }
    }

    await queryClient.prefetchQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, activeList.id], () =>
      api.todo.list.getOne(activeList.id),
    )
  }

  return {
    props: {},
  }
})

const Dashboard: PageWithLayout = () => {
  const router = useRouter()
  const getListId = useCallback(() => router.query.id?.[0] ?? null, [router])
  const [listId, setListId] = useState(() => getListId())

  useEffect(() => {
    setListId(getListId())
  }, [getListId])

  return (
    <Flex py={{ base: 8, md: 12 }} justifyContent="center">
      <TodoTabs listId={listId} />
    </Flex>
  )
}

Dashboard.getLayout = (page) => {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default Dashboard
