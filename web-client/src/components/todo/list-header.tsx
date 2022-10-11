import { UpdateTodoListSchema } from '@/api/todo/list'
import { useUpdateListMutation } from '@/hooks'
import { TodoList } from '@/utils/types'
import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  Input,
  useEditableControls,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FiCheck, FiEdit } from 'react-icons/fi'
import { ValidationError } from 'yup'
import { TooltipIconButton } from '../common'
import { DeleteTodoList } from './delete-list'

type Props = {
  list: TodoList
}

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
      type="submit"
      size="sm"
      ml="2"
      icon={<FiCheck />}
      aria-label="Submit"
    />
  ) : (
    <TooltipIconButton
      {...getEditButtonProps()}
      isLoading={isLoading}
      disabled={isInvalid || isLoading}
      variant="solid"
      size="sm"
      rounded="md"
      icon={<FiEdit />}
      ml="2"
      aria-label="Edit List Title"
    />
  )
}

export const TodoListHeader: React.FC<Props> = ({ list }) => {
  const { mutate, isLoading } = useUpdateListMutation(list.id)

  const formik = useFormik({
    initialValues: {
      title: list.title,
    },
    /**
     * Using `validate` instead of `validationSchema` since we need to differentiate between
     * empty string and undefined. There is currently an issue where empty strings are sent
     * as undefined to the validator only when using `validationSchema`. See:
     * https://github.com/jaredpalmer/formik/issues/1357
     */
    validate: async (values) => {
      try {
        await UpdateTodoListSchema.validate(values)
      } catch (e) {
        if (e instanceof ValidationError) {
          return {
            title: e.message,
          }
        }
      }
    },
    onSubmit: (values) => {
      if (values.title !== list.title) {
        mutate(values)
      }
    },
  })

  const handleSubmit = async () => {
    if (!!formik.errors.title) {
      await formik.setFieldValue('title', list.title, true)
    }
    formik.handleSubmit()
  }

  return (
    <HStack spacing="2" mb="6" justifyContent="stretch">
      <Editable
        value={formik.values.title}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontSize="2xl"
        minW="0"
        minH="12"
        flexGrow="1"
        onSubmit={handleSubmit}
        isPreviewFocusable={false}
      >
        <EditablePreview as="h1" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" />
        <Input
          isInvalid={!!formik.errors.title}
          name="title"
          as={EditableInput}
          onChange={formik.handleChange}
          focusBorderColor="none"
        />
        <EditTitleControls isLoading={isLoading} isInvalid={!!formik.errors.title} />
      </Editable>

      <DeleteTodoList list={list} />
    </HStack>
  )
}
