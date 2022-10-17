import { ApiErrorAlert } from '@/components/common'
import { FilterItemsBy, useTodoList, useTodoListItemCount } from '@/hooks'
import { Center, Divider, Fade, List, Spinner, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CreateTodoItem, TodoListItem } from '../item'
import { EmptyTodoListAlert } from './empty-alert'
import { TodoListFilter } from './filter'
import { TodoListHeader } from './header'

type Props = {
  listId: string
}

export const TodoList: React.FC<Props> = ({ listId }) => {
  const [filterBy, setFilterBy] = useState(FilterItemsBy.ALL)
  const { data: list, isLoading, isError, error } = useTodoList(listId, filterBy)
  const itemCount = useTodoListItemCount(listId)

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

  const filteredItems = list.items ?? []
  const isEmpty = itemCount === 0 || filteredItems.length === 0

  return (
    <VStack spacing="10" alignItems="stretch">
      <TodoListHeader list={list} />
      <CreateTodoItem list={list} />

      {isEmpty ? (
        <Fade in>
          <EmptyTodoListAlert>
            {itemCount === 0
              ? `You don't have any todos in this list! Use the field above to add some.`
              : `The selected filter has no matches! Try a different option using the buttons below.`}
          </EmptyTodoListAlert>
        </Fade>
      ) : (
        <List>
          <AnimatePresence initial={false}>
            {filteredItems.map((item) => (
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

      <TodoListFilter value={filterBy} onChange={setFilterBy} />
    </VStack>
  )
}
