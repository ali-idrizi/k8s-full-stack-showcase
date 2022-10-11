import { TodoItem } from '@/utils/types'
import {
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Input,
  useEditableControls,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FiCheck, FiEdit } from 'react-icons/fi'
import { HoverVisibleBox } from './hover-visible-box'

type EditTitleControlsProps = {
  isLoading: boolean
  isInvalid: boolean
}
const EditTitleControls: React.FC<EditTitleControlsProps> = ({ isLoading, isInvalid }) => {
  const { isEditing, getSubmitButtonProps, getEditButtonProps } = useEditableControls()

  return isEditing ? (
    <IconButton
      {...getSubmitButtonProps()}
      isLoading={isLoading}
      disabled={isInvalid || isLoading}
      variant="ghost"
      type="submit"
      size="sm"
      ml="2"
      icon={<FiCheck />}
      aria-label="Submit"
    />
  ) : (
    <IconButton
      {...getEditButtonProps()}
      isLoading={isLoading}
      disabled={isInvalid || isLoading}
      variant="ghost"
      size="sm"
      rounded="md"
      icon={<FiEdit />}
      ml="2"
      aria-label="Edit Todo"
    />
  )
}

type TodoTitleProps = {
  todo: TodoItem
}
export const TodoTitle: React.FC<TodoTitleProps> = ({ todo }) => {
  const formik = useFormik({
    initialValues: {
      title: todo.title,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const handleSubmit = () => {
    formik.handleSubmit()
  }

  return (
    <Editable
      value={formik.values.title}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      fontSize="md"
      minW="0"
      minH="12"
      flexGrow="1"
      pl="1"
      onSubmit={handleSubmit}
      isPreviewFocusable={false}
    >
      <EditablePreview as="span" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" />
      <Input
        isInvalid={!!formik.errors.title}
        name="title"
        as={EditableInput}
        onChange={formik.handleChange}
        focusBorderColor="none"
      />
      <HoverVisibleBox>
        <EditTitleControls isLoading={false} isInvalid={!!formik.errors.title} />
      </HoverVisibleBox>
    </Editable>
  )
}
