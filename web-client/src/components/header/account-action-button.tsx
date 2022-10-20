import { useLogoutMutation } from '@/hooks'
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import { FiUser } from 'react-icons/fi'

export const AccountActionButton: React.FC = () => {
  const { mutate } = useLogoutMutation()
  const toast = useToast()

  const onLogout = () => {
    mutate(null, {
      onSettled(_, error) {
        toast({
          position: 'bottom-right',
          description: error ? 'Uh-oh! Something went wrong!' : 'You have been logged out!',
          status: error ? 'error' : 'success',
          isClosable: true,
          duration: 5000,
          variant: 'subtle',
        })
      },
    })
  }

  return (
    <Menu isLazy placement="bottom-end">
      <MenuButton
        data-testid="account-action-button"
        as={IconButton}
        aria-label="Options"
        icon={<FiUser />}
        variant="outline"
        rounded="full"
      />
      <MenuList>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AccountActionButton
