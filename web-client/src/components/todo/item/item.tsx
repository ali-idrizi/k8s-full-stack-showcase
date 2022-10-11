import { TodoItem } from '@/utils/types'
import { Checkbox, Divider, ListItem } from '@chakra-ui/react'
import { DeleteTodoItem } from './delete'
import { TodoTitle } from './title'

type TodoListItemProps = {
  todo: TodoItem
}
export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  return (
    <>
      <ListItem data-group display="flex" alignItems="center" gap="2" py="3">
        <Checkbox size="lg" checked={todo.completed} aria-label={todo.title} />
        <TodoTitle todo={todo} />
        <DeleteTodoItem />
      </ListItem>
      <Divider orientation="horizontal" />
    </>
  )
}
