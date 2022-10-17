import { FilterItemsBy, useBrandColors } from '@/hooks'
import { Button, ButtonGroup } from '@chakra-ui/react'

type FilterByButtonProps = {
  isActive: boolean
  onClick: () => void
}
const FilterByButton: React.FC<React.PropsWithChildren<FilterByButtonProps>> = ({
  isActive,
  onClick,
  ...rest
}) => {
  const { primaryScheme } = useBrandColors()

  return (
    <Button
      height="auto"
      textTransform="uppercase"
      fontSize="xs"
      p="2"
      colorScheme={isActive ? primaryScheme : 'gray'}
      onClick={onClick}
      {...rest}
    />
  )
}

type TodoListFilterProps = {
  onChange: (value: FilterItemsBy) => void
  value: FilterItemsBy
}
export const TodoListFilter: React.FC<TodoListFilterProps> = ({ value, onChange }) => {
  return (
    <ButtonGroup isAttached aria-label="Filter By">
      {[FilterItemsBy.ALL, FilterItemsBy.ACTIVE, FilterItemsBy.COMPLETED].map((option) => (
        <FilterByButton key={option} isActive={value === option} onClick={() => onChange(option)}>
          {option}
        </FilterByButton>
      ))}
    </ButtonGroup>
  )
}
