import { ApiErrorAlert } from '@/components'
import { useBrandColors } from '@/hooks'
import { useTodoLists } from '@/hooks/queries/todo-list'
import {
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useMemo } from 'react'
import { TodoList } from './list'

const CreateTodoList = dynamic(import('./create-list').then((mod) => mod.CreateTodoList))

type Props = {
  listId: string
}

export const TodoTabs: React.FC<Props> = ({ listId }) => {
  const { data: todoLists, isLoading, isError, error } = useTodoLists()
  const { primaryScheme } = useBrandColors()
  const tabListBorderColor = useColorModeValue('gray.100', 'gray.700')

  const index = useMemo(() => {
    return todoLists?.findIndex((list) => list.id === listId) ?? 0
  }, [todoLists, listId])

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
        borderBottom="2px solid"
        borderColor={tabListBorderColor}
      >
        {todoLists.map((list) => (
          <Link key={list.id} href={`/dashboard/${list.id}`} shallow passHref>
            <Tab as="a">{list.title}</Tab>
          </Link>
        ))}

        <CreateTodoList />
      </TabList>

      <TabPanels>
        {todoLists.map((list) => (
          <TabPanel key={list.id} mt="6">
            <AnimatePresence initial={false}>
              {list.id === listId && (
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
    </Tabs>
  )
}
