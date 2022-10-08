import { useTodoList } from '@/hooks/queries/todo-list'
import { Alert, AlertIcon, Center, Spinner } from '@chakra-ui/react'
import { ApiErrorAlert } from '../common'

type Props = {
  listId: string
}

export const TodoList: React.FC<Props> = ({ listId }) => {
  const { data: list, isLoading, isError, error } = useTodoList(listId)

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  if (isError) {
    return <ApiErrorAlert error={error} />
  }

  const todoItems = list.items ?? []

  return (
    <>
      {todoItems.length === 0 && (
        <Alert status="info" rounded="md">
          <AlertIcon />
          You don't have any todos in this list! Use the field above to add some.
        </Alert>
      )}

      {todoItems.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </>
  )
}
