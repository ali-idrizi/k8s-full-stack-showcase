import { ApiErrorAlert } from '@/components'
import { useBrandColors } from '@/hooks'
import { useTodoLists } from '@/hooks/queries/todo-list'
import {
  Icon,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { TodoList } from './list'
import { EmptyTodoListAlert } from './list/empty-alert'

const CreateTodoList = dynamic(import('./list').then((mod) => mod.CreateTodoList))

type Props = {
  activeListId: string | null
}

export const TodoTabs: React.FC<Props> = ({ activeListId }) => {
  const { data: todoLists, isLoading, isError, error } = useTodoLists()
  const { primaryScheme } = useBrandColors()
  const tabListBorderColor = useColorModeValue('gray.100', 'gray.700')

  const index = useMemo(() => {
    return todoLists?.findIndex((list) => list.id === activeListId) ?? -1
  }, [todoLists, activeListId])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <ApiErrorAlert error={error} />
  }

  return (
    <Tabs
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
        mb="6"
        borderBottom="2px solid"
        borderColor={tabListBorderColor}
      >
        {todoLists.map((list) => (
          <Link key={list.id} href={`/dashboard/${list.id}`} shallow passHref>
            <Tab
              as="a"
              display="block"
              maxW="32"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              title={list.title}
            >
              {list.title}
            </Tab>
          </Link>
        ))}

        <CreateTodoList />
      </TabList>

      <TabPanels>
        {todoLists.map((list) => (
          <TabPanel key={list.id}>
            <AnimatePresence initial={false}>
              {list.id === activeListId && (
                <motion.div
                  initial={{ marginTop: 15, opacity: 0 }}
                  animate={{ marginTop: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <TodoList listId={list.id} />
                </motion.div>
              )}
            </AnimatePresence>
          </TabPanel>
        ))}
      </TabPanels>

      {todoLists.length === 0 && (
        <EmptyTodoListAlert>
          <Text>
            You don't have any lists! Use the <Icon w="5" verticalAlign="middle" as={FiPlus} />{' '}
            button above to add one.
          </Text>
        </EmptyTodoListAlert>
      )}
    </Tabs>
  )
}
