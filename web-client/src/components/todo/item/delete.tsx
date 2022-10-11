import { useDeleteItemMutation } from '@/hooks'
import { TodoItem } from '@/utils/types'
import { Icon, IconButton } from '@chakra-ui/react'
import { FiTrash } from 'react-icons/fi'
import { HoverVisibleBox } from './hover-visible-box'

type Props = {
  todo: TodoItem
}

export const DeleteTodoItem: React.FC<Props> = ({ todo }) => {
  const { mutate } = useDeleteItemMutation(todo.id)

  return (
    <HoverVisibleBox>
      <IconButton
        variant="ghost"
        size="sm"
        rounded="md"
        aria-label="Delete Todo"
        onClick={() => mutate(null)}
        icon={<Icon as={FiTrash} />}
      />
    </HoverVisibleBox>
  )
}
