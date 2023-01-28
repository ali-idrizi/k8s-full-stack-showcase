import { TodoTabs } from '@/components'
import { withAuth, withAuthenticatedRoute, withHocs, withReactQuery } from '@/hocs'
import { withApi } from '@/hocs/with-api'
import { useTodoLists } from '@/hooks'
import { EmptyLayout } from '@/layouts'
import { QUERY_KEY } from '@/utils/constants'
import { PageWithLayout } from '@/utils/types'
import { Flex } from '@chakra-ui/react'
import Router, { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

export const getServerSideProps = withHocs(
  withReactQuery,
  withAuth,
  withAuthenticatedRoute(),
  withApi,
)(async ({ queryClient, api }, ctx) => {
  const listId = ctx.params?.id?.[0] ?? null

  await queryClient.prefetchQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS], api.todo.list.getAll)

  if (listId) {
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
  const { data: lists } = useTodoLists()

  const paramListId = router.query.id?.[0]
  const activeList = useMemo(() => {
    return (
      lists?.find((list) => list.id === paramListId) ??
      lists?.find((list) => list.default) ??
      lists?.[0]
    )
  }, [lists, paramListId])

  useEffect(() => {
    if (activeList?.id && paramListId !== activeList.id) {
      Router.replace(`/dashboard/${activeList.id}`)
    }
  }, [activeList, paramListId])

  return (
    <Flex py={{ base: 8, md: 12 }} justifyContent="center">
      <TodoTabs activeListId={activeList?.id ?? null} />
    </Flex>
  )
}

Dashboard.getLayout = (page) => {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default Dashboard
