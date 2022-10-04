import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { FiUser } from 'react-icons/fi'

export const AccountActionButton: React.FC = () => {
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
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AccountActionButton
