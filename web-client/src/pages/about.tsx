import { gssp } from '@/hocs'
import { useAuth } from '@/hooks'
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import React from 'react'

export const getServerSideProps = gssp(() => {
  return {
    props: {},
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const About: React.FC<Props> = () => {
  const auth = useAuth()

  return (
    <div>
      <h1>About Page {auth.userId}</h1>

      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
    </div>
  )
}

export default About
