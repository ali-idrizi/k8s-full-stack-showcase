import { TECH_STACK } from '@/utils/constants'
import { TechDetails, TechType } from '@/utils/types'
import { TextProps, Wrap, WrapItem } from '@chakra-ui/react'

type TechProps = {
  details: TechDetails
}

const Tech: React.FC<TechProps> = ({ details }) => {
  let colorScheme: TextProps['bgColor']

  switch (details.type) {
    case TechType.PLATFORM:
      colorScheme = 'orange'
      break
    case TechType.UTILITY:
      colorScheme = 'red'
      break
    case TechType.LIBRARY:
      colorScheme = 'blue'
      break
    case TechType.LANGUAGE:
      colorScheme = 'purple'
      break
    default:
      colorScheme = 'green'
  }

  return (
    <WrapItem
      rounded="full"
      overflow="hidden"
      border="1px solid"
      borderColor={`${colorScheme}.600`}
      justifyContent="center"
      fontSize="xs"
      py="2"
      px="3"
      lineHeight="1"
      minWidth="10ch"
    >
      {details.title}
    </WrapItem>
  )
}

export const FooterTechStack: React.FC = () => {
  return (
    <Wrap spacing="1" pt={{ base: 6, lg: 8 }}>
      {TECH_STACK.map((details) => {
        return <Tech key={details.title} details={details} />
      })}
    </Wrap>
  )
}
