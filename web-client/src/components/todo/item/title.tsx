import { UpdateTodoItemSchema } from '@/api/todo/item'
import { useUpdateItemMutation } from '@/hooks/mutations/todo/item/update'
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
import { MutableRefObject } from 'react'
import { FiCheck, FiEdit } from 'react-icons/fi'
import { ValidationError } from 'yup'
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
  checkboxRef: MutableRefObject<HTMLInputElement | null>
  todo: TodoItem
}
export const TodoTitle: React.FC<TodoTitleProps> = ({ checkboxRef, todo }) => {
  const { mutate, isLoading } = useUpdateItemMutation(todo.id)

  const formik = useFormik({
    initialValues: {
      title: todo.title,
    },
    /**
     * Using `validate` instead of `validationSchema` since we need to differentiate between
     * empty string and undefined. There is currently an issue where empty strings are sent
     * as undefined to the validator only when using `validationSchema`. See:
     * https://github.com/jaredpalmer/formik/issues/1357
     */
    validate: async (values) => {
      try {
        await UpdateTodoItemSchema.validate(values)
      } catch (e) {
        if (e instanceof ValidationError) {
          return {
            title: e.message,
          }
        }
      }
    },
    onSubmit: (values) => {
      mutate(values, {
        onSettled: () => {
          if (checkboxRef.current) {
            checkboxRef.current.focus()
          }
        },
      })
    },
  })

  const resetTitle = () => formik.setFieldValue('title', todo.title, true)
  const handleSubmit = async () => {
    if (!!formik.errors.title) {
      await resetTitle()
    }
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
      onCancel={resetTitle}
      isPreviewFocusable={false}
    >
      <EditablePreview
        as="span"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        textDecor={todo.completed ? 'line-through' : undefined}
        opacity={todo.completed ? '0.65' : undefined}
      />
      <Input
        isInvalid={!!formik.errors.title}
        name="title"
        as={EditableInput}
        onChange={formik.handleChange}
        focusBorderColor="none"
      />
      <HoverVisibleBox>
        <EditTitleControls isLoading={isLoading} isInvalid={!!formik.errors.title} />
      </HoverVisibleBox>
    </Editable>
  )
}
