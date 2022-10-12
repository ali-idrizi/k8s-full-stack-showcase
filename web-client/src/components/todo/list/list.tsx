import { ApiErrorAlert } from '@/components/common'
import { useTodoList } from '@/hooks/queries/todo-list'
import { Alert, AlertIcon, Center, Divider, Fade, List, Spinner } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { TodoListItem } from '../item'
import { TodoListHeader } from './header'

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
      <TodoListHeader list={list} />

      {todoItems.length === 0 ? (
        <Fade in>
          <Alert status="info" rounded="md">
            <AlertIcon />
            You don't have any todos in this list! Use the field above to add some.
          </Alert>
        </Fade>
      ) : (
        <List>
          <AnimatePresence initial={false}>
            {todoItems.map((item) => (
              <motion.li
                key={item.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TodoListItem todo={item} />
                <Divider />
              </motion.li>
            ))}
          </AnimatePresence>
        </List>
      )}
    </>
  )
}
