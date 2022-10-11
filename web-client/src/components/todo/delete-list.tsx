import { FiTrash } from 'react-icons/fi'
import { TooltipIconButton } from '../common'

export const DeleteTodoList: React.FC = () => {
  return (
    <TooltipIconButton
      variant="solid"
      size="sm"
      rounded="md"
      icon={<FiTrash />}
      aria-label="Delete List"
    />
  )
}
