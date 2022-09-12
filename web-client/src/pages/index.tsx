import { compose, withAuthHoc, withReactQueryHoc } from '@/hocs'
import { Button, useColorMode } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import React from 'react'

type Todo = {
  title: string
}

const getTodos = async (): Promise<Todo[]> => {
  return [
    {
      title: 'delectus aut autem',
    },
    {
      title: 'quis ut nam facilis et officia qui',
    },
  ]
}

const gsspHoc = compose(withAuthHoc, withReactQueryHoc)

export const getServerSideProps = gsspHoc(async ({ queryClient }) => {
  await queryClient.prefetchQuery(['todos'], getTodos)
  console.log('fetched todos')

  return {
    props: {},
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: React.FC<Props> = ({ auth }) => {
  const { data, isSuccess, isError } = useQuery<Todo[]>(['todos'], getTodos)

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div>
      <h1>Welcome {auth.userId}</h1>

      <Button onClick={toggleColorMode} rounded="full">
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>

      {isError && <p>Failed to fetch data</p>}

      {isSuccess && (
        <div data-testid="todos">
          {data.map((todo, index) => {
            return (
              <React.Fragment key={index}>
                {todo.title}
                <br />
              </React.Fragment>
            )
          })}
        </div>
      )}

      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
    </div>
  )
}

export default Home
