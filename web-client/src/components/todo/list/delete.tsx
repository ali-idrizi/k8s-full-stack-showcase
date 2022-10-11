import { useDeleteListMutation } from '@/hooks'
import { TodoList } from '@/utils/types'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FiTrash } from 'react-icons/fi'
import { ApiErrorAlert, TooltipIconButton } from '@/components/common'

type DeleteModalProps = {
  list: TodoList
  isOpen: boolean
  onClose: () => void
}
const DeleteModal: React.FC<DeleteModalProps> = ({ list, isOpen, onClose }) => {
  const router = useRouter()
  const toast = useToast()
  const { mutate, reset, error, isLoading } = useDeleteListMutation(list.id)

  const onConfirm = () => {
    mutate(null, {
      onSuccess: () => {
        toast({
          position: 'bottom-right',
          description: `List "${list.title}" has been deleted!`,
          status: 'success',
          isClosable: true,
          duration: 5000,
          variant: 'subtle',
        })

        router.push('/dashboard')
      },
    })
  }

  const onModalClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete this List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete the list "{list.title}" and all of its contents?
          <ApiErrorAlert mt="5" error={error} />
        </ModalBody>

        <ModalFooter as={HStack}>
          <Button onClick={onModalClose} variant="ghost">
            Cancel
          </Button>
          <Button onClick={onConfirm} colorScheme="red" isLoading={isLoading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

type DeleteTodoListProps = {
  list: TodoList
}
export const DeleteTodoList: React.FC<DeleteTodoListProps> = ({ list }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <TooltipIconButton
        variant="solid"
        size="sm"
        rounded="md"
        icon={<FiTrash />}
        aria-label="Delete List"
        aria-haspopup="dialog"
        onClick={onOpen}
      />

      <DeleteModal list={list} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
