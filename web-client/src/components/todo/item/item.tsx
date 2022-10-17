import { useUpdateItemMutation } from '@/hooks/mutations'
import { TodoItem } from '@/utils/types'
import { Checkbox, HStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { DeleteTodoItem } from './delete'
import { TodoTitle } from './title'

type TodoListItemProps = {
  todo: TodoItem
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const checkboxRef = useRef<HTMLInputElement>(null)
  const { mutate } = useUpdateItemMutation(todo.id)

  const onCheckboxChange = () => {
    mutate({
      completed: !todo.completed,
    })
  }

  return (
    <HStack data-group py="3">
      <Checkbox
        ref={checkboxRef}
        colorScheme="teal"
        size="lg"
        isChecked={todo.completed}
        aria-label={todo.title}
        onChange={onCheckboxChange}
      />
      <TodoTitle checkboxRef={checkboxRef} todo={todo} />
      <DeleteTodoItem todo={todo} />
    </HStack>
  )
}
