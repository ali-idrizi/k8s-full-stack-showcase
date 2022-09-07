import withAuth, { WithAuth } from '@/hocs/withAuth'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

import styles from '@/pages/index.module.css'

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

export const getServerSideProps = withAuth(async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['todos'], getTodos)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

const Home: React.FC<WithAuth> = ({ auth }) => {
  const { data, isSuccess, isError } = useQuery<Todo[]>(['todos'], getTodos)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome {auth.userId}</h1>

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
