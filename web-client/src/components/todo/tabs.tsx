import { TooltipIconButton } from '@/components'
import { useBrandColors } from '@/hooks'
import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

export const TodoTabs: React.FC = () => {
  const { primaryScheme } = useBrandColors()
  const tabListBorderColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <Tabs
      isLazy
      colorScheme={primaryScheme}
      variant="solid-rounded"
      alignSelf="center"
      w="full"
      maxW="96"
    >
      <TabList
        gap="2"
        flexWrap="wrap"
        pb="4"
        borderBottom="2px solid"
        borderColor={tabListBorderColor}
      >
        <Tab>One</Tab>
        <Tab>Two</Tab>

        <TooltipIconButton ml="auto" aria-label="Add New List" icon={<FiPlus />} />
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
