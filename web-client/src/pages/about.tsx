import { withAuth } from '@/hocs'
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import React from 'react'

export const getServerSideProps = withAuth(() => {
  return {
    props: {},
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const About: React.FC<Props> = ({ auth }) => {
  return (
    <div>
      <h1>About Page {auth.userId}</h1>

      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
    </div>
  )
}

export default About
