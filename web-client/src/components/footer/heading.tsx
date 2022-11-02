import { useBrandColors } from '@/hooks'
import { Heading, Text } from '@chakra-ui/react'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'

const HIGHLIGHT_TEXT: readonly string[] = [
  'Accessible',
  'Scalable',
  'Responsive',
  'Maintainable',
  'Testable',
  'Modern',
]
const HIGHLIGHT_WIDTH = Math.max(...HIGHLIGHT_TEXT.map((text) => text.length)) + 1

export const FooterHeading: React.FC = () => {
  const controls = useAnimationControls()
  const { primary, secondary } = useBrandColors()
  const [highlightIndex, setHighlightIndex] = useState(0)

  useEffect(() => {
    const animate = async () => {
      await controls.start((i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.04 },
      }))

      await controls.start(() => ({
        opacity: 0,
        transition: { delay: 2 },
      }))

      setHighlightIndex((highlightIndex + 1) % HIGHLIGHT_TEXT.length)
    }

    animate()
  }, [controls, highlightIndex])

  return (
    <Heading as="h4" fontSize="lg">
      <Text
        color={highlightIndex % 2 === 0 ? primary : secondary}
        as="span"
        display="inline-flex"
        minW={`${HIGHLIGHT_WIDTH}ch`}
        justifyContent="center"
        border="2px solid"
        borderColor="currentcolor"
        transition="color .5s"
        rounded="full"
        lineHeight="1"
        mr="2"
        py="2"
      >
        {HIGHLIGHT_TEXT[highlightIndex]?.split('').map((char, index) => {
          return (
            <motion.span
              key={`${highlightIndex}${index}`}
              custom={index}
              animate={controls}
              style={{ opacity: 0, y: 5 }}
            >
              {char}
            </motion.span>
          )
        })}
      </Text>{' '}
      full&#8209;stack monorepo showcase todo app built with&hellip;
    </Heading>
  )
}
