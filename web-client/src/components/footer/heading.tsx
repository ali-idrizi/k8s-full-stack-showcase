import { useBrandColors } from '@/hooks'
import { Heading, Text } from '@chakra-ui/react'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'

const HIGHLIGHT_TEXT = ['Accessible', 'Scalable', 'Responsive', 'Maintainable', 'Testable'] as const
const HIGHLIGHT_WIDTH = Math.max(...HIGHLIGHT_TEXT.map((text) => text.length))

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

      setHighlightIndex(highlightIndex === HIGHLIGHT_TEXT.length - 1 ? 0 : highlightIndex + 1)
    }

    animate()
  }, [controls, highlightIndex])

  return (
    <Heading as="h4" fontSize="xl" py="8">
      <Text
        color={highlightIndex % 2 === 0 ? primary : secondary}
        as="span"
        display="inline-flex"
        minW={`${HIGHLIGHT_WIDTH}ch`}
        justifyContent="center"
        borderBottom="2px solid"
        borderColor="currentcolor"
        transition="color .5s"
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
      full-stack monorepo showcase app running on Kubernetes written in TypeScript
    </Heading>
  )
}
