import { TooltipIconButton } from '@/components'
import { useBrandColors } from '@/hooks'
import { useTodoLists } from '@/hooks/queries/todo-list'
import {
  Alert,
  AlertIcon,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'

type Props = {
  listId: string
}

export const TodoTabs: React.FC<Props> = ({ listId }) => {
  const { data: todoLists, isLoading, isError } = useTodoLists()
  const { primaryScheme } = useBrandColors()
  const tabListBorderColor = useColorModeValue('gray.100', 'gray.700')

  const index = useMemo(() => {
    return todoLists?.findIndex((list) => list.id === listId) ?? 0
  }, [todoLists, listId])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return (
      <Alert status="error" rounded="md">
        <AlertIcon />
        An error occurred! Please try again later.
      </Alert>
    )
  }

  return (
    <Tabs
      isLazy
      colorScheme={primaryScheme}
      variant="solid-rounded"
      alignSelf="center"
      w="full"
      maxW="45rem"
      index={index}
    >
      <TabList
        gap="2"
        flexWrap="wrap"
        pb="4"
        borderBottom="2px solid"
        borderColor={tabListBorderColor}
      >
        {todoLists.map((list) => (
          <Link key={list.id} href={`/dashboard/${list.id}`} passHref>
            <Tab as="a">{list.title}</Tab>
          </Link>
        ))}

        <TooltipIconButton ml="auto" aria-label="Add New List" icon={<FiPlus />} />
      </TabList>

      <TabPanels>
        {todoLists.map((list) => (
          <TabPanel key={list.id}>{list.title}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
