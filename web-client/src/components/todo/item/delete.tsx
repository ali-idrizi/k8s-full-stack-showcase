import { Icon, IconButton } from '@chakra-ui/react'
import { FiTrash } from 'react-icons/fi'
import { HoverVisibleBox } from './hover-visible-box'

export const DeleteTodoItem: React.FC = () => {
  return (
    <HoverVisibleBox>
      <IconButton
        variant="ghost"
        size="sm"
        rounded="md"
        aria-label="Delete Todo"
        icon={<Icon as={FiTrash} />}
      />
    </HoverVisibleBox>
  )
}
